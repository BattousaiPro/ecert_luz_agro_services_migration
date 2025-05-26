import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Comunas } from './api/comuna/entities/comuna.entity';
import { ComunaController } from './api/comuna/controller/comuna.controller';
import { ComunaService } from './api/comuna/service/comuna.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'82.197.82.107',
      port:3306,
      username: 'u134865480_dev_root',
      password: 'Ge5]Kj2i?nA',
      database: 'u466446141_Test_Agro_BD',
      entities:[Comunas],
      synchronize: false,
     }),
    TypeOrmModule.forFeature([Comunas]),
  ],
  controllers: [AppController, ComunaController],
  providers: [AppService, ComunaService],
})
export class AppModule {}