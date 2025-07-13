import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Comunas } from './api/comuna/entities/comuna.entity';
import { ComunaController } from './api/comuna/controller/comuna.controller';
import { ComunaService } from './api/comuna/service/comuna.service';
import { Sector } from './api/sector/entities/sector.entity';
import { SectorController } from './api/sector/controller/sector.controller';
import { SectorService } from './api/sector/service/sector.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:'82.197.82.107',
      port:3306,
      username: 'u134865480_dev_root',
      password: 'Ge5]Kj2i?nA',
      database: 'u134865480_Test_Agro_BD',
      entities:[Comunas,
        Sector
      ],
      synchronize: false,
     }),
    TypeOrmModule.forFeature([Comunas,
      Sector
    ]),
  ],
  controllers: [AppController, ComunaController, SectorController],
  providers: [AppService, ComunaService, SectorService],
})
export class AppModule {}