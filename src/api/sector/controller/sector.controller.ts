import { Controller, Get } from '@nestjs/common';
import { SectorService } from '../service/sector.service';
import { Sector } from '../entities/sector.entity';

@Controller('sectores')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Get('findAll')
  getAll(): Promise<Sector[]> {
    return this.sectorService.findAll();
  }
}