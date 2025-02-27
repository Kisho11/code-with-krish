import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { CustomersController } from './customer.controller';
import { CustomersService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomersController],
  providers: [CustomersService],
  // exports: [CustomersService],
})
export class CustomersModule {}