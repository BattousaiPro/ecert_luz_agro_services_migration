import { Controller, Post, Body, Get, ParseIntPipe, Param, Patch } from "@nestjs/common";
import { ComunaService } from "../service/comuna.service";
import { FilterExpenseDto } from "../dto/FilterComuna.dto";
import { GenericResponse } from "src/api/genericDto/GenericResponse";
import { ComunaDto } from "../dto/comuna.dto";

@Controller('/comunas')
export class ComunaController {

    constructor(private readonly comunaService: ComunaService) { }

    //@UseGuards(JwtAuthGuard)
    @Get("/")
    async getAll(): Promise<GenericResponse> {
        return await this.comunaService.getAll();
    }

    //@UseGuards(JwtAuthGuard)
    @Post("/")
    async new(@Body() comuna: ComunaDto): Promise<GenericResponse> {
        return await this.comunaService.new(comuna);
    }

    //@UseGuards(JwtAuthGuard)
    @Patch("/:codigo")
    async edit(@Body() comuna: ComunaDto, @Param("codigo", ParseIntPipe) codigo: number): Promise<GenericResponse> {
        return await this.comunaService.edit(comuna, codigo);
    }

    //@UseGuards(JwtAuthGuard)
    @Get("/:codigo")
    async delete(@Param("codigo", ParseIntPipe) codigo: number): Promise<GenericResponse> {
        return await this.comunaService.delete(codigo);
    }

    @Post('/findByFilter')
    findByFilter(@Body() filterExpenseDto: FilterExpenseDto): Promise<GenericResponse> {
        return this.comunaService.findByFilter(filterExpenseDto);
    }
}