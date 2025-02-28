import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe, ParseIntPipe, HttpStatus, HttpCode, Query } from '@nestjs/common';
import { ProductsService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { StockValidationResponseDto } from './dto/stock-validation-response.dto';

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

}