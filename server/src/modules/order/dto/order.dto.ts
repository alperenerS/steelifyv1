import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class OrderDto {
    @IsString()
    @IsNotEmpty()
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
  }