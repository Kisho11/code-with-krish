import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from './entity/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateOrderStatus } from './dto/update-order.dto';



@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order) private readonly orderRepository:Repository<Order>,
        @InjectRepository(OrderItem) private readonly orderItemRepository:Repository<OrderItem>

){}



async create(createOrderDto: CreateOrderDto): Promise<Order>{
    const { customerId, items} = createOrderDto;
    const order = this.orderRepository.create({
        customerId, 
        status: 'PENDING'

    });

    //await - async
    const savedOrder = await this.orderRepository.save(order);

    const orderItems = items.map((item)=>
        this.orderItemRepository.create({
            productId:item.productId,
            price: item.price,
            quantity:item.quantity,
            order:savedOrder,

        }),

    );

    await this.orderItemRepository.save(orderItems);
    return this.orderRepository.findOne({where: {id: savedOrder.id}, relations:['items']});

}

async fetch(id: any) {
    return this.orderRepository.findOne({where: {id}, relations:['items']});
}

async fetchAll() {
    return this.orderRepository.find({relations:['items']});
}

async updateStatus(id: number, UpdateOrderStatus: UpdateOrderStatus){
    const order = await this.orderRepository.findOne({where: {id}});
    if(!order){ 
        throw new NotFoundException('Order with id ${id} not found');
    }
    if(order.status === 'DELIVERED' || order.status === 'CANCELLED'){
        throw new BadRequestException('Order status cannot be updated');

    }
    order.status = UpdateOrderStatus.status;
    return await this.orderRepository.save(order);
}



}