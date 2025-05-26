import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comuna } from './comuna.entity';

@Injectable()
export class ComunaService {
  constructor(
    @InjectRepository(Comuna)
    private comunaRepository: Repository<Comuna>,
  ) {}

  findAll(): Promise<Comuna[]> {
    return this.comunaRepository.find();
  }
}