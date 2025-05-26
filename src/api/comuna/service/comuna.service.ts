import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comunas } from '../entities/comuna.entity';

@Injectable()
export class ComunaService {
  constructor(
    @InjectRepository(Comunas)
    private comunaRepository: Repository<Comunas>,
  ) {}

  findAll(): Promise<Comunas[]> {
    return this.comunaRepository.find({ select: ["codigo", "descrip", "estado"] });
  }
}