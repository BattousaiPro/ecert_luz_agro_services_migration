import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './entities/sector.entity';
import { SectorService } from './service/sector.service';
import { SectorController } from './controller/sector.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  controllers: [SectorController],
  providers: [SectorService],
  exports: [SectorService],
})
export class SectorModule {}