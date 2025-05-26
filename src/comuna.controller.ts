import { Controller, Get } from "@nestjs/common";
import { ComunaService } from "./comuna.service";
import { Comuna } from './comuna.entity'

@Controller('/comunas')
export class ComunaController {

    constructor(private readonly comunaService: ComunaService) {}

    @Get('/findAll')
    getAll(): Promise<Comuna[]>{
        return this.comunaService.findAll();
    }
}