import { IsNotEmpty, IsString } from 'class-validator';

export class LocationDispatchDto {
    @IsNotEmpty()
    @IsString()
    vehicle_number: string;

    @IsNotEmpty()
    @IsString()
    city: string;

}