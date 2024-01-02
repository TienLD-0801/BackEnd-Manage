import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { HttpMessage } from '../../global/globalEnum';
import { OrderModel } from '../../models/order.model';
import { OrderDto } from './dto/order.dto';
import { ResponseData } from '../../global/globalClass';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from '../../shared/constants/constants';

@ApiTags(API_TAG.order)
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('api/orders')
  @HttpCode(HttpStatus.OK)
  async getAllOrder(): Promise<ResponseData<OrderModel>> {
    try {
      return new ResponseData<OrderModel>(
        await this.orderService.getAllOrder(),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);

      return new ResponseData<OrderModel>(
        null,
        HttpStatus.UNAUTHORIZED,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('api/create-order')
  @HttpCode(HttpStatus.OK)
  async CreateOrder(
    @Body(new ValidationPipe()) orderCreate: OrderDto,
  ): Promise<ResponseData<OrderModel>> {
    try {
      return new ResponseData<OrderModel>(
        await this.orderService.createOrder(orderCreate),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);

      return new ResponseData<OrderModel>(
        null,
        HttpStatus.OK,
        HttpMessage.ERROR,
      );
    }
  }
}
