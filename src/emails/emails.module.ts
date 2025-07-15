import { Module } from '@nestjs/common';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';
import { EmailsService } from './emails.service';
import { LoggerModule } from '../logger';
import { EnvVar } from 'src/enums';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService): Promise<MailerOptions> => ({
        transport: {
          host: config.get<string>(EnvVar.SMTP_HOST),
          port: +config.get<string>(EnvVar.SMTP_PORT),
          auth: {
            user: config.get<string>(EnvVar.SMTP_USER),
            pass: config.get<string>(EnvVar.SMTP_PASSWORD),
          },
        },
        defaults: {
          from: config.get<string>(EnvVar.FROM_EMAIL),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
    LoggerModule,
  ],
  providers: [EmailsService],
  exports: [EmailsService],
})
export class EmailsModule {}
