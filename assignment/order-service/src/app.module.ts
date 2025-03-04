import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { OrderItem } from './orders/entity/order-item.entity';
import { Order } from './orders/entity/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


// @Module({
//   imports: [],

// })

@Module({
  imports: [OrdersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.HOSTNAME || 'localhost',
    port: 3306,
    username : 'root',
    password : 'password',
    database : 'cosmos',
    entities: [Order, OrderItem],
    synchronize: true,
  })],

})

export class AppModule {}
