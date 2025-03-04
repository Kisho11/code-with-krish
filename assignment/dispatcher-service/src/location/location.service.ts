import { NotFoundException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationDispatchDto } from './dto/create-locationDispatch.dto'
import { LocationDispatch } from './entity/location-dispatch.entity';
import { promises } from 'dns';

@Injectable()
export class LocationService {
    constructor(
        @InjectRepository(LocationDispatch)
        private locationRepository: Repository<LocationDispatch>,
    ) {}

    async create(locationDispatchDto: LocationDispatchDto){
        const locationDispatch = this.locationRepository.create(locationDispatchDto);
        return await this.locationRepository.save(locationDispatch);
    }

    async findAll(): Promise<LocationDispatch[]> {
        return await this.locationRepository.find();
      }
    
      async findOne(id: number): Promise<LocationDispatch> {
        const customer = await this.locationRepository.findOne({ where: { id } });
        
        if (!customer) {
          throw new NotFoundException(`Customer with ID ${id} not found`);
        }
        
        return customer;
      }
}
