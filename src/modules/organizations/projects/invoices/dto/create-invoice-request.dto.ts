import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CurrencyType, InvoiceType } from 'src/db/entities';

export class CreateInvoiceItemRequest {
  @ApiProperty({
    type: String,
    example: 'Monthly bill',
    required: true,
  })
  @MaxLength(24)
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    example: 'Pay monthly internet bill',
    required: false,
  })
  @IsOptional()
  readonly note?: string;

  @ApiProperty({
    type: Number,
    example: 100000,
    required: true,
  })
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  readonly quantity: number;
}
export class CreateInvoiceRequestDto {
  @ApiProperty({
    type: Date,
    example: '2024-02-26T07:31:35.000Z',
    required: true,
  })
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty({
    type: InvoiceType,
    enum: InvoiceType,
    enumName: 'InvoiceType',
    example: InvoiceType.EXPENSE,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(InvoiceType)
  readonly type: InvoiceType;

  @ApiProperty({
    type: CurrencyType,
    enum: CurrencyType,
    enumName: 'CurrencyType',
    example: CurrencyType.VND,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(CurrencyType)
  readonly currency: CurrencyType;

  @ApiProperty({
    type: String,
    example: 'John Doe',
    required: true,
  })
  @IsNotEmpty()
  readonly clientName: string;

  @ApiProperty({
    type: String,
    example: 'INV-F1A',
    required: true,
  })
  @IsOptional()
  readonly uid: string;

  @ApiProperty({
    type: Number,
    example: 10,
    required: false,
  })
  @IsOptional()
  readonly tax?: number;

  @ApiProperty({
    type: Number,
    example: 10,
    required: true,
  })
  @IsNotEmpty()
  readonly discount: number;

  @ApiProperty({
    type: String,
    example: 'Pay monthly internet bill',
    required: false,
  })
  @IsOptional()
  readonly note?: string;

  @ApiProperty({
    type: Number,
    example: 24.35,
    required: false,
  })
  @IsOptional()
  readonly exchangeRate?: number;

  @ApiProperty({
    type: [CreateInvoiceItemRequest],
  })
  @ValidateNested()
  @IsArray()
  readonly items: CreateInvoiceItemRequest[];

  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
  })
  @IsOptional()
  readonly categoryId?: number;
}

export class CreateInvoicesRequestDto {
  @ApiProperty({
    type: [CreateInvoiceRequestDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInvoiceRequestDto)
  readonly invoices: CreateInvoiceRequestDto[];
}
