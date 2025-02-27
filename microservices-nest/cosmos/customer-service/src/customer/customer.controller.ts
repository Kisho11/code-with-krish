import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { CustomersService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';


@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }
}