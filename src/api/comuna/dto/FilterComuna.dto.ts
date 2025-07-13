import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator';
import { PaginRequest } from 'src/api/pagunate/pagin.request';


export class FilterExpenseDto extends PaginRequest {

  @ApiProperty()
  @IsOptional()
  codigo: number;

  @ApiProperty()
  @IsOptional()
  descrip: string;

}