import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailController } from './controllers/email.controller';
import { EmailService } from './services/email.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
  ],
  controllers: [EmailController],
  providers: [EmailService],
})
export class AppModule {} 