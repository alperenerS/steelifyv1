import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class OrderDto {
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly customer: string;
  @IsString()
  @IsNotEmpty()
  readonly incoterm: string;
  @IsString()
  @IsNotEmpty()
  readonly paymentterm: string;
  @IsString()
  @IsNotEmpty()
  readonly incoterm_description: string;
  @IsString()
  @IsNotEmpty()
  readonly quotation_note: string;
  @IsNotEmpty()
  readonly delivery_date: Date;
  @IsString()
  @IsNotEmpty()
  readonly status: string;
  @IsString()
  @IsNotEmpty()
  readonly reference: string;
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;
}
