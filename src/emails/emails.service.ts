import { MailerService } from '@nestjs-modules/mailer';
import { Logger } from 'nestjs-pino';
import { Injectable } from '@nestjs/common';
import * as otpGenerator from 'otp-generator';
import { Asset } from 'src/types';

@Injectable()
export class EmailsService {
  private readonly otpStore = new Map<string, string>();

  constructor(
    private readonly mailer: MailerService,
    private readonly logger: Logger,
  ) {}

  async requestCode(to: string) {
    const code = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    this.otpStore.set(to, code);

    console.log(this.otpStore)

    try {
      const data = await this.mailer.sendMail({
        to,
        subject: 'Credential code for GCEX Proof of Reserve',
        template: 'request-code',
        context: { code },
      });

      this.logger.log(JSON.stringify(data));
      return { message: 'OTP have been sent' };
    } catch (error) {
      this.otpStore.delete(to);
      this.logger.error(JSON.stringify(error));
    }
  }

  verifyCode(email: string, code: string): boolean {
    console.log("email", email, "Code: ", code)
    const stored = this.otpStore.get(email);
    console.log("Stored: ", stored)
    if (!stored) return false;
    const valid = stored === code;
    // if (valid) this.otpStore.delete(email);
    return valid;
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

  async srCardsAlert(
    to: string[],
    threshold: number,
    balances: { total: number; currency: string }[],
  ) {
    try {
      const data = await this.mailer.sendMail({
        to,
        subject: '⚠️ Card-Pro (Admin Account) Balance Alert',
        template: 'sr-cards-alert',
        context: {
          threshold,
          balances,
        },
      });
      this.logger.log(JSON.stringify(data));
    } catch (error) {
      this.logger.error(JSON.stringify(error));
    }
  }
}
