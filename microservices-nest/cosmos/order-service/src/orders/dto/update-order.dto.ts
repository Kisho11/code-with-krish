import { IsEnum, IsNotEmpty } from 'class-validator';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export class UpdateOrderStatus {
  @IsNotEmpty()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}