import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';
import { Asset } from 'src/types';

@Injectable()
export class EmailsService {
  constructor(
    private readonly mailer: MailerService,
    private readonly logger: Logger,
  ) {}

  async requestCode(to: string, code: string): Promise<any> {
    try {
      const data = await this.mailer.sendMail({
        to,
        subject: 'Credential code for GC Jade admin application',
        template: 'request-code',
        context: {
          code,
        },
      });

      this.logger.log(JSON.stringify(data));
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }

  async alert(
    to: string[],
    level: number,
    account: string,
    threshold: number,
    assets: Asset[],
  ) {
    try {
      const data = await this.mailer.sendMail({
        to,
        subject: 'Alert message for low balance',
        template: 'alert',
        context: {
          level,
          account,
          threshold,
          balances: assets,
        },
      });
      this.logger.log(JSON.stringify(data));
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
