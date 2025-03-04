import { Controller, Get, Post, Body, Param, Delete, Patch, Put, ValidationPipe, ParseIntPipe, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { StockValidationResponseDto } from './dto/stock-validation-response.dto';
import { ReduceQuantityDto } from './dto/reduce-quantity.dto';
import { NotFoundException } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto){
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Get(':id/validate')
  validateStock(
    @Param('id') id: number,
    @Query('quantity') quantity: number,
  ) {
    return this.productsService.validateStock(id, quantity);
  }

  @Patch(':id/quantity')
  reduceQuantity(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) reduceQuantityDto: ReduceQuantityDto,
  ): Promise<Product> {
    return this.productsService.reduceQuantity(id, reduceQuantityDto.quantity);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, createProductDto);
  }

}