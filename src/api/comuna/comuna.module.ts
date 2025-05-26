import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comunas } from "./entities/comuna.entity";
import { ComunaController } from "./controller/comuna.controller";
import { ComunaService } from "./service/comuna.service";

@Module({
  imports: [TypeOrmModule.forFeature([Comunas])],
  controllers: [ComunaController],
  providers: [ComunaService],
  exports: [ComunaService],
})
export class ComunaModule {}
