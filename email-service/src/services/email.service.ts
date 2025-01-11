import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get('SMTP_PORT'),
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  async sendDailyReport(report: any) {
    const itemSummary = Object.entries(report.itemSummary)
      .map(([sku, quantity]) => `${sku}: ${quantity}`)
      .join('\n');

    const emailContent = `
      Daily Sales Report for ${report.date}
      
      Total Sales: $${report.totalSales}
      
      Item Summary:
      ${itemSummary}
    `;

    await this.transporter.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: 'recipient@example.com',
      subject: `Daily Sales Report - ${report.date}`,
      text: emailContent,
    });
  }
} 