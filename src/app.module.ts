import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Comuna } from './comuna.entity';
import { ComunaService } from './comuna.service';
import { ComunaController } from './comuna.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'82.197.82.107',
      port:3306,
      username: 'u134865480_dev_root',
      password: 'Ge5]Kj2i?nA',
      database: 'u466446141_Test_Agro_BD',
      entities:[Comuna],
      synchronize: false,
     }),
    TypeOrmModule.forFeature([Comuna]),
  ],
  controllers: [AppController, ComunaController],
  providers: [AppService, ComunaService],
})
export class AppModule {}