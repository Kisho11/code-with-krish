import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatus } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {

    constructor(private ordersService: OrdersService) { }

    @Post()
    async create(@Body() createOrderDto: CreateOrderDto) {
        return await this.ordersService.create(createOrderDto);
    }

    @Get(':id')
    async fetch(@Param('id') id: any) {
        return this.ordersService.fetch(id);
    }

    @Get()
    async fetchAll() {
        return this.ordersService.fetchAll();
    }

    @Patch(':id/status')
    async updateStatus(
        @Param('id') id: number,
        @Body() updateOrderStatus: UpdateOrderStatus
    ) {
        return await this.ordersService.updateStatus(id, updateOrderStatus);
    }

}
