import { Controller, Post, Body } from "@nestjs/common";
import { ComunaService } from "../service/comuna.service";
import { FilterExpenseDto } from "../dto/FilterComuna.dto";
import { GenericResponse } from "src/api/genericDto/GenericResponse";

@Controller('/comunas')
export class ComunaController {

    constructor(private readonly comunaService: ComunaService) {}

    @Post('/findAll1')
    getAll(@Body() filterExpenseDto: FilterExpenseDto): Promise<GenericResponse>{
        return this.comunaService.findAll(filterExpenseDto);
    }
}