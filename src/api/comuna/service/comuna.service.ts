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

  async getAll(codigo: number): Promise<GenericResponse> {
    // console.log('method getAll');
    let resp: GenericResponse = new GenericResponse();
    return resp;
  }

  async new(codigo: number): Promise<GenericResponse> {
    // console.log('method new');
    let resp: GenericResponse = new GenericResponse();
    return resp;
  }

  async edit(codigo: number): Promise<GenericResponse> {
    // console.log('method edit');
    let resp: GenericResponse = new GenericResponse();
    return resp;
  }

  async delete(codigo: number): Promise<GenericResponse> {
    // console.log('method delete');
    let resp: GenericResponse = new GenericResponse();
    let RegistroToRemove: Comunas = new Comunas();
    try {
      RegistroToRemove = await this.comunaRepository.findOneBy({ codigo });
      if (!RegistroToRemove) {
        resp.code = '1';
        resp.data = new Comunas();
        resp.message = StatusCode.ERROR + ': Comuna no existe';
        return resp;
      }
    } catch (error) {
      resp.code = '-1';
      resp.message = StatusCode.ERROR + ': Al buscar la Comuna';
      resp.data = null;
      return resp;
    }

    try {
      const removeVal: Comunas = await this.comunaRepository.remove(RegistroToRemove);
      resp.data = null;
    } catch (error) {
      console.log(JSON.stringify(error));
      resp.code = '-2';
      resp.message = StatusCode.ERROR;
      resp.data = null;
    }
    return resp;
  }

  async findByFilter(filterExpenseDto: FilterExpenseDto): Promise<GenericResponse> {
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