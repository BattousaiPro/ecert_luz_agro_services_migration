import { Controller, Post, Body, Get, ParseIntPipe, Param } from "@nestjs/common";
import { ComunaService } from "../service/comuna.service";
import { FilterExpenseDto } from "../dto/FilterComuna.dto";
import { GenericResponse } from "src/api/genericDto/GenericResponse";

@Controller('/comunas')
export class ComunaController {

    constructor(private readonly comunaService: ComunaService) { }

    //@UseGuards(JwtAuthGuard)
    @Get("/:codigo")
    async getExpenses(@Param("codigo", ParseIntPipe) codigo: number): Promise<GenericResponse> {
        return await this.comunaService.delete(codigo);
    }

    @Post('/findByFilter')
    getAll(@Body() filterExpenseDto: FilterExpenseDto): Promise<GenericResponse> {
        return this.comunaService.findByFilter(filterExpenseDto);
    }
}