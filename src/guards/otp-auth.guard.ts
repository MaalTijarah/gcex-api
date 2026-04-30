import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { EmailsService } from 'src/emails/emails.service';

@Injectable()
export class OtpAuthGuard implements CanActivate {
  constructor(private readonly emailsService: EmailsService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const email = req.query['email'] as string;
    const code = req.headers['x-otp-code'] as string;

    if (!email || !code) {
      throw new UnauthorizedException('Incorrect Credentials');
    }

    if (!this.emailsService.verifyCode(email, code)) {
      throw new UnauthorizedException('Invalid or expired OTP');
    }

    return true;
  }
}
