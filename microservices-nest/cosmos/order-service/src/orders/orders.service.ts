import {
    BadRequestException,
    Injectable,
    NotFoundException,
    OnModuleInit
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { Order } from './entity/order.entity';
  import { OrderItem } from './entity/order-item.entity';
  import { createOrderDto } from './dto/create-order.dto';
  import { OrderStatus, UpdateOrderStatus } from './dto/update-order.dto';
  import { HttpService } from '@nestjs/axios';
  import { lastValueFrom } from 'rxjs';
  import { Kafka } from 'kafkajs';
  
  @Injectable()
  export class OrdersService {
    private kafka = new Kafka({brokers: ['localhost:9092']});
    private readonly producer = this.kafka.producer();
    private readonly consumer = this.kafka.consumer({groupId: 'kishanthan-order-service'});

    private readonly inventoryServiceUrl = 'http://localhost:3001/products';
    private readonly customerServiceUrl = 'http://localhost:3002/customers';
    
    constructor(
      @InjectRepository(Order)
      private readonly orderRepository: Repository<Order>,
      @InjectRepository(OrderItem)
      private readonly orderItemRepository: Repository<OrderItem>,
      private readonly httpService: HttpService,
    ) {}
    
    
    async create(createOrderDto: createOrderDto): Promise<any> {
      const { customerId, items } = createOrderDto;
      
      // Validate customer exists and get customer details
      let customerDetails;
      try {
        const response$ = this.httpService.get(
          `${this.customerServiceUrl}/${customerId}`,
        );
        const response = await lastValueFrom(response$);
        customerDetails = response.data;
      } catch (error) {
        throw new BadRequestException(
          `Customer ID ${customerId} does not exist.`,
        );
      }


      this.producer.send({
        topic: 'kishanthan.order.create',
        messages: [
          { value: JSON.stringify({customerId, customerDetails, items}) },
        ],
      });
      console.log('--produce-----kishanthan.order.create-------');
      return {message: 'Order is placed. waitting inventory service to process'};
  
      // // Fetch product details and validate stock for all items
      // const itemsWithDetails = await Promise.all(
      //   items.map(async (item) => {
      //     try {
      //       // First get product details to get the price
      //       const productResponse$ = this.httpService.get(
      //         `${this.inventoryServiceUrl}/${item.productId}`,
      //       );
      //       const productResponse = await lastValueFrom(productResponse$);
      //       const productDetails = productResponse.data;
            
      //       // Then validate stock
      //       const stockResponse$ = this.httpService.get(
      //         `${this.inventoryServiceUrl}/${item.productId}/validate?quantity=${item.quantity}`,
      //       );
      //       const stockResponse = await lastValueFrom(stockResponse$);
            
      //       if (!stockResponse.data.available) {
      //         throw new BadRequestException(
      //           `Product ID ${item.productId} is out of stock.`,
      //         );
      //       }
            
      //       // Return item with price from product details
      //       return {
      //         ...item,
      //         price: item.price || productDetails.price, // Use provided price or get from product
      //       };
      //     } catch (error) {
      //       throw new BadRequestException(
      //         `Error processing Product ID ${item.productId}: ${error.message}`,
      //       );
      //     }
      //   })
      // );
      
      // // Create order
      // const order = this.orderRepository.create({
      //   customerId,
      //   status: OrderStatus.PENDING,
      //   customerDetails: customerDetails, // Include customer details in the order
      // });
      
      // const savedOrder = await this.orderRepository.save(order);
      
      // // Create order items with prices
      // const orderItems = itemsWithDetails.map((item) =>
      //   this.orderItemRepository.create({
      //     productId: item.productId,
      //     price: item.price,
      //     quantity: item.quantity,
      //     order: savedOrder,
      //   }),
      // );
      
      // const savedOrderItems = await this.orderItemRepository.save(orderItems);
      
      // // Reduce stock in Inventory Service
      // for (const item of savedOrderItems) {
      //   try {
      //     console.log(`Reducing stock for Product ID ${item.productId} by ${item.quantity}`);
          
      //     const response$ = this.httpService.patch(
      //       `${this.inventoryServiceUrl}/${item.productId}/quantity`,
      //       { quantity: item.quantity },
      //     );
          
      //     await lastValueFrom(response$);
      //     console.log(`Stock reduction successful for Product ID ${item.productId}`);
      //   } catch (error) {
      //     console.error(`Failed to reduce stock for Product ID ${item.productId}:`, error.response?.data || error.message);
      //     throw new BadRequestException(
      //       `Failed to reduce stock for Product ID ${item.productId}: ${error.message}`,
      //     );
      //   }
      // }
      
      // // Return the created order with customer details and items
      // return { 
      //   ...savedOrder, 
      //   customerName: customerDetails.name,
      //   customerEmail: customerDetails.email,
      //   items: savedOrderItems 
      // };
    }
    
    async fetch(id: number) {
      const order = await this.orderRepository.findOne({
        where: { id },
        relations: ['items'],
      });
      
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      
      return order;
    }
    
    async fetchAll() {
      return await this.orderRepository.find({ 
        relations: ['items'],
        order: {
          createdAt: 'DESC' // Assuming you have a createdAt field for sorting
        }
      });
    }
    
    async updateOrderStatus(id: number, updateStatus: UpdateOrderStatus) {
      const order = await this.orderRepository.findOne({ where: { id } });
      
      if (!order) {
        throw new NotFoundException(`Order with ID ${id} not found`);
      }
      
      if (
        order.status === OrderStatus.DELIVERED ||
        order.status === OrderStatus.CANCELLED
      ) {
        throw new BadRequestException(
          `Order status cannot be changed when it's delivered or cancelled`,
        );
      }
      
      order.status = updateStatus.status;
      return await this.orderRepository.save(order);
    }

    async consumeConfirmOrders() {
      await this.consumer.subscribe({ topic: 'kishanthan.order.inventory.update' });
      
      console.log('--subscribe---kishanthan.order.inventory.update----');
      await this.consumer.run({
        eachMessage: async ({ message }) => {
          const { customerId, items } = JSON.parse(
            message.value.toString(),
          );
          // console.log('items', items);
          const order = this.orderRepository.create({
            customerId,
            status: 'CONFIRMED',
          });
          const savedOrder = await this.orderRepository.save(order);
          const orderItems = items.map((item) =>
            this.orderItemRepository.create({
              productId: item.productId,
              price: item.price,
              quantity: item.quantity,
              order: savedOrder,
            }),
          );
          console.log("----order.inventory.update-----")
          await this.orderItemRepository.save(orderItems);
        },
      });
  
      this.producer.send({
        topic: 'kishanthan.order.confirmed',
        messages: [{ value: 'Order service is ready to process orders' }],
      });
      console.log('--produce-----kishanthan.order.confirmed-------');
    }
  }