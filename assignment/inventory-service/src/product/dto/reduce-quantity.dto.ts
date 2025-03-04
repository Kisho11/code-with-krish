import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ReduceQuantityDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}