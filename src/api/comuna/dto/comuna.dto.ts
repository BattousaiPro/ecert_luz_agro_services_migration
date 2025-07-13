import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ComunaDto {
    @ApiProperty()
    @IsNotEmpty()
    codigo: number;

    @ApiProperty()
    @IsNotEmpty()
    descrip: string;

    @ApiProperty()
    @IsNotEmpty()
    estado: boolean;
}