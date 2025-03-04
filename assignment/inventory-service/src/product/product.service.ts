import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entity/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { StockValidationResponseDto } from './dto/stock-validation-response.dto';
import { BadRequestException } from '@nestjs/common';
import { Kafka } from 'kafkajs'; 

@Injectable()
export class ProductsService {
  private kafka = new Kafka({ brokers: ['localhost:9092'] });
  private readonly producer = this.kafka.producer();
  private readonly consumer = this.kafka.consumer({ groupId: 'product-service' });
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.producer.connect();
    await this.consumer.connect();
    await this.consumeOrderCreated();
  }

  async create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
    return await this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }


  async validateStock(id: number, quantity: number) {
    const product = await this.findOne(id);
    
    const response = new StockValidationResponseDto();
    response.available = product.quantity >= quantity;
    
    return response;
  }

  async update(id: number, createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    
    // Update product properties
    Object.assign(product, createProductDto);
    
    return await this.productsRepository.save(product);
  }

  async reduceQuantity(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    
    if (product.quantity < quantity) {
      throw new BadRequestException(`Insufficient stock for product with ID ${id}`);
    }
    
    product.quantity -= quantity;
    return await this.productsRepository.save(product);
  }

  async consumeOrderCreated(){
    await this.consumer.subscribe({ topic: 'kishanthan.order.create' });

    console.log('--subscribe--kishanthan.order.create-----');
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        const { customerId, customerName, items } = JSON.parse(
          message.value.toString(),
        );

        for (const item of items) {
          await this.reduceQuantity(item.productId, item.quantity);
          
        }
        await this.producer.send({
          topic: 'kishanthan.order.inventory.update',
          messages: [{value: JSON.stringify({customerId, customerName, items})}],
        });  
        console.log('--produce-----Kishanthan.order.inventory.update------');      
      },
    });
  }
}