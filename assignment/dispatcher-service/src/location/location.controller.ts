import { Controller, Get, Post, Body, Param, Delete, Put, ValidationPipe, ParseIntPipe, HttpStatus, HttpCode } from '@nestjs/common';
import { LocationDispatchDto } from './dto/create-locationDispatch.dto';
import { LocationService } from './location.service';
import { LocationDispatch } from './entity/location-dispatch.entity';


@Controller('dispatch-locations')
export class LocationController {
    constructor(private readonly locationService : LocationService) {}

        @Post()
        async create(@Body() locationDispatchDto: LocationDispatchDto) {
          return await this.locationService.create(locationDispatchDto);
        }
      
        @Get()
        findAll() {
          return this.locationService.findAll();
        }
      
        @Get(':id')
        findOne(@Param('id') id: number) {
          return this.locationService.findOne(id);
        }
}

