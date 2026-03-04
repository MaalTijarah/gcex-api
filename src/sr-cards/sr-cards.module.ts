import { Module } from '@nestjs/common';
import { SrCardsService } from './sr-cards.service';
import { EmailsModule } from 'src/emails';
import { LoggerModule } from 'src/logger';

@Module({
  imports: [EmailsModule, LoggerModule],
  providers: [SrCardsService],
  exports: [SrCardsService],
})
export class SrCardsModule {}
