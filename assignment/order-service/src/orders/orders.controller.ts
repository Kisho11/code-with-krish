import { Controller, Get, Post, Body, Param, Patch, HttpCode, HttpStatus, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { createOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatus } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(ValidationPipe) createOrderDto: createOrderDto) {
    return await this.ordersService.create(createOrderDto);
  }

  @Get()
  async findAll() {
    return await this.ordersService.fetchAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.ordersService.fetch(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateOrderStatus: UpdateOrderStatus,
  ) {
    return await this.ordersService.updateOrderStatus(id, updateOrderStatus);
  }
}