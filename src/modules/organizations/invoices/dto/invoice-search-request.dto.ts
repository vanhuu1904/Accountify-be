import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { InvoiceType } from 'src/db/entities';

export class InvoiceSearchRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  fromDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  toDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  uid?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(InvoiceType)
  type?: InvoiceType;

  @ApiProperty({ required: false })
  @IsOptional()
  projectId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  status?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  categoryId?: number;
}
