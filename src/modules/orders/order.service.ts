import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { OrderDto } from './dto/order.dto';
import { OrderEntity } from '../../entities/order.entity';

@Injectable()
export class OrderService {
  private transporter: nodemailer.Transporter;
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {
    //khoi tao transporter
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ducloi.hutech@gmail.com', // Tên người dùng SMTP
        pass: 'zbjxcgdhpjdofbhh',
      },
    });
  }

  async getAllOrder() {
    const order = await this.orderRepository.find();
    return order;
  }

  async checkDuplicateDate(requestDate: Date) {
    try {
      const existingOrder = await this.orderRepository.findOne({
        where: {
          dateSchedule: requestDate,
        },
      });
      return existingOrder;
    } catch (error) {
      console.log(error);
    }
  }

  async createOrder(data: OrderDto): Promise<OrderEntity> {
    const currentDate = new Date();
    const requestDate = new Date(data.dateSchedule);
    const ExitDuplicateOrder = await this.checkDuplicateDate(requestDate);

    if (ExitDuplicateOrder) {
      throw new Error('Ngày bị trùng!');
    }

    if (requestDate < currentDate) {
      throw new Error('Không thể tạo đơn hàng cho ngày tháng năm quá khứ.');
    }

    try {
      await this.sendMail(data);
      return await this.orderRepository.save(data);
    } catch (error) {
      console.log(error);
    }
  }

  async sendMail(data: OrderDto): Promise<void> {
    try {
      await this.transporter.sendMail({
        to: `${data.email}`,
        from: 'ducloi.hutech@gmail.com',
        subject: 'Đơn đặt',
        text: 'Well come',
        html: `<b>Đơn đặt lich ngày ${data.dateSchedule} của bạn thành công !</b>`,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
