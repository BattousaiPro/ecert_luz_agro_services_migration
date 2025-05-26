import { Controller, Get } from "@nestjs/common";
import { ComunaService } from "../service/comuna.service";
import { Comunas } from "../entities/comuna.entity";

@Controller('/comunas')
export class ComunaController {

    constructor(private readonly comunaService: ComunaService) {}

    @Get('/findAll')
    getAll(): Promise<Comunas[]>{
        return this.comunaService.findAll();
    }
}