import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { HttpMessage } from '../../global/globalEnum';
import { OrderDto } from './dto/order.dto';
import { ResponseData } from '../../global/globalClass';
import { ApiTags } from '@nestjs/swagger';
import { API_TAG } from '../../shared/constants/constants';
import { OrderEntity } from 'src/entities/order.entity';

@ApiTags(API_TAG.order)
@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('api/orders')
  @HttpCode(HttpStatus.OK)
  async getAllOrder(): Promise<ResponseData<OrderEntity>> {
    try {
      return new ResponseData<OrderEntity>(
        await this.orderService.getAllOrder(),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);

      return new ResponseData<OrderEntity>(
        null,
        HttpStatus.UNAUTHORIZED,
        HttpMessage.ERROR,
      );
    }
  }

  @Post('api/create-order')
  @HttpCode(HttpStatus.OK)
  async CreateOrder(
    @Body() orderCreate: OrderDto,
  ): Promise<ResponseData<OrderEntity>> {
    try {
      return new ResponseData<OrderEntity>(
        await this.orderService.createOrder(orderCreate),
        HttpStatus.OK,
        HttpMessage.SUCCESS,
      );
    } catch (error) {
      console.log(error);

      return new ResponseData<OrderEntity>(
        null,
        HttpStatus.OK,
        HttpMessage.ERROR,
      );
    }
  }
}
