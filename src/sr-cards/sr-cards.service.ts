import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import { EnvVar } from 'src/enums';
import { EmailsService } from 'src/emails';
import { HttpService } from 'src/http';

interface SrCardsBalanceResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    currency: string;
  }[];
}

/**
 * Balance thresholds (descending order).
 * Each cron run sends exactly ONE alert for the lowest breached threshold.
 */
const SR_CARDS_BALANCE_THRESHOLDS = [1000, 500];

@Injectable()
export class SrCardsService {
  constructor(
    private readonly emails: EmailsService,
    private readonly http: HttpService,
    private readonly config: ConfigService,
    private readonly logger: Logger,
  ) {}

  // @Cron('0 */6 * * *') // Every 6 hours
  @Cron(CronExpression.EVERY_10_SECONDS)
  async checkBalanceAndAlert() {
    this.logger.log('SR Cards: Starting balance check...');

    try {
      const balanceUrl = this.config.get<string>(EnvVar.SR_CARDS_BALANCE_URL);

      const response =
        await this.http.axiosRef.get<SrCardsBalanceResponse>(balanceUrl);

      const { success, data } = response.data;

      if (!success) {
        this.logger.error(
          `SR Cards: Balance API returned unsuccessful response. ${JSON.stringify(response.data)}`,
        );
        return;
      }

      const usdBalance = data.find((item) => item.currency === 'USD');

      if (!usdBalance) {
        this.logger.warn('SR Cards: No USD balance found in API response.');
        return;
      }

      this.logger.log(`SR Cards: Current USD balance is ${usdBalance.total}`);

      // Find the lowest breached threshold (most critical).
      // Sort descending, filter those breached, take the last one.
      const breachedThreshold = [...SR_CARDS_BALANCE_THRESHOLDS]
        .sort((a, b) => b - a)
        .filter((t) => usdBalance.total < t)
        .pop();

      if (!breachedThreshold) {
        this.logger.log(
          'SR Cards: Balance is above all thresholds. No alert needed.',
        );
        return;
      }

      this.logger.warn(
        `SR Cards: USD balance (${usdBalance.total}) is below threshold (${breachedThreshold}). Sending alert email.`,
      );

      const recipientsStr = this.config.get<string>(
        EnvVar.SR_CARDS_ALERT_RECIPIENTS,
      );
      const recipients = recipientsStr.split(',');

      const lowBalances = data.filter((item) => item.total < breachedThreshold);

      await this.emails.srCardsAlert(
        recipients,
        breachedThreshold,
        lowBalances,
      );

      this.logger.log('SR Cards: Alert email sent successfully.');
    } catch (error) {
      this.logger.error(
        `SR Cards: Error during balance check - ${JSON.stringify(error)}`,
      );
    }
  }
}
