import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invoice, InvoiceDocument } from '../schemas/invoice.schema';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
    @Inject('RABBITMQ_SERVICE') private client: ClientProxy,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel(createInvoiceDto);
    return createdInvoice.save();
  }

  async findOne(id: string): Promise<Invoice> {
    return this.invoiceModel.findById(id);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find();
  }

  @Cron('0 12 * * *')
  async generateDailyReport() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dailySales = await this.invoiceModel.aggregate([
      {
        $match: {
          date: {
            $gte: today,
            $lt: tomorrow,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$amount' },
          items: {
            $push: '$items',
          },
        },
      },
    ]);

    if (dailySales.length > 0) {
      const itemSummary = {};
      dailySales[0].items.flat().forEach((item) => {
        if (!itemSummary[item.sku]) {
          itemSummary[item.sku] = 0;
        }
        itemSummary[item.sku] += item.qt;
      });

      const report = {
        date: today,
        totalSales: dailySales[0].totalSales,
        itemSummary,
      };

      this.client.emit('daily_sales_report', report);
    }
  }
} 