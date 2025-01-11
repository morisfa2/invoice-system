import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { EmailService } from '../services/email.service';

@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('daily_sales_report')
  async handleDailyReport(data: any) {
    await this.emailService.sendDailyReport(data);
  }
} 