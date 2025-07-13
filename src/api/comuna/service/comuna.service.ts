import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Comunas } from '../entities/comuna.entity';
import { FilterExpenseDto } from '../dto/FilterComuna.dto';
import { GenericResponse, StatusCode } from 'src/api/genericDto/GenericResponse';

@Injectable()
export class ComunaService {
  constructor(
    @InjectRepository(Comunas)
    private comunaRepository: Repository<Comunas>,
  ) { }

  async findAll(filterExpenseDto: FilterExpenseDto): Promise<GenericResponse> {
    let resp: GenericResponse = new GenericResponse();
    try {

      const [results, totalReg] = await this.comunaRepository.findAndCount(
        {
          where: {
            codigo: filterExpenseDto.codigo ? filterExpenseDto.codigo : null,
            descrip: filterExpenseDto.descrip ? Like('%' + filterExpenseDto.descrip + '%') : null,
            estado: true
          },
          order: { codigo: "ASC" },
          take: filterExpenseDto.limit,
          skip: (filterExpenseDto.pageSize - 1) * filterExpenseDto.limit
        }
      );
      resp.data = {
        totalReg,
        nextPage: filterExpenseDto.pageSize + 1,
        previousPage: filterExpenseDto.pageSize,
        results,
      };
    } catch (error) {
      console.log(JSON.stringify(error));
      resp.code = '-1';
      resp.message = StatusCode.ERROR;
      resp.data = null;
    }
    return resp;
  }
}