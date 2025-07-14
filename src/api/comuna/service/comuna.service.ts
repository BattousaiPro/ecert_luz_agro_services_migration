import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Comunas } from '../entities/comuna.entity';
import { FilterExpenseDto } from '../dto/FilterComuna.dto';
import { GenericResponse, StatusCode } from 'src/api/genericDto/GenericResponse';
import { ComunaDto } from '../dto/comuna.dto';

@Injectable()
export class ComunaService {
  constructor(
    @InjectRepository(Comunas)
    private comunaRepository: Repository<Comunas>,
  ) { }

  async getAll(): Promise<GenericResponse> {
    // console.log('method getAll');
    let resp: GenericResponse = new GenericResponse();
    let dataResponse: Comunas[] = [];
    try {
      dataResponse = await this.comunaRepository.find({
        select: ['codigo', 'descrip', 'estado']
      });
    } catch (error) {
      resp.code = '-1';
      resp.message = StatusCode.ERROR + ': ' + error;
      resp.data = null;
      console.log(JSON.stringify(resp));
      return resp;
    }
    if (dataResponse.length === 0) {
      resp.code = '-2';
      resp.message = StatusCode.ERROR + ', Sin Registros';
      resp.data = null;
      return resp;
    }
    resp.data = this.convertToVOs(dataResponse);
    return resp;
  }

  async new(comuna: ComunaDto): Promise<GenericResponse> {
    // console.log('method new');
    let resp: GenericResponse = new GenericResponse();
    let dataResponse: Comunas = new Comunas();
    try {
      const { codigo, descrip } = comuna;
      try {
        let toNew: Comunas = await this.comunaRepository.findOneBy([{ codigo }, { descrip }]);
        if (toNew) {
          resp.code = '-4';
          resp.data = null;
          resp.message = 'Comuna ya existe';
          return resp;
        }
      } catch (error) {
        // console.log(JSON.stringify(error));
        resp.code = '-3';
        resp.message = StatusCode.ERROR;
        resp.data = null;
        return resp;
      }

      try {
        const newElement = Object.assign(new Comunas(), {
          codigo, descrip, estado: true
        });
        dataResponse = await this.comunaRepository.save(newElement);
        resp.data = dataResponse.codigo;
      } catch (error) {
        // console.log(JSON.stringify(error));
        resp.code = '-2';
        resp.message = StatusCode.ERROR;
        resp.data = null;
      }
    } catch (error) {
      // console.log(JSON.stringify(error));
      resp.code = '-1';
      resp.message = StatusCode.ERROR;
      resp.data = null;
    }
    return resp;
  }

  async edit(comuna: ComunaDto, codigo: number): Promise<GenericResponse> {
    // console.log('method edit');
    let resp: GenericResponse = new GenericResponse();
    let dataResponse: Comunas = new Comunas();
    let elementToEdit: Comunas = new Comunas();
    try {
      //const codigo = codigo);
      elementToEdit = await this.comunaRepository.findOneBy({ codigo });
      if (!elementToEdit) {
        resp.code = '-3';
        resp.data = new Comunas();
        console.log('Comuna no existe');
        return resp;
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      resp.code = '-2';
      resp.message = StatusCode.ERROR;
      resp.data = null;
      return resp;
    }

    try {
      elementToEdit = this.getObjectEdit(comuna, elementToEdit);
      dataResponse = await this.comunaRepository.save(elementToEdit);
    } catch (error) {
      console.log(JSON.stringify(error));
      resp.code = '-1';
      resp.message = StatusCode.ERROR;
      resp.data = null;
    }
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

  // Utility Method.
  private convertToVOs(inputUser: Comunas[]): ComunaDto[] {
    let salidaUser: ComunaDto[] = [];
    for (let index = 0; index < inputUser.length; index++) {
      salidaUser.push(this.convertToVO(inputUser[index]));
    }
    return salidaUser;
  }

  private convertToVO(inputUser: Comunas): ComunaDto {
    let itemUser: ComunaDto = new ComunaDto();
    itemUser = new ComunaDto();
    itemUser.codigo = inputUser.codigo;
    itemUser.descrip = inputUser.descrip;
    itemUser.estado = inputUser.estado;
    return itemUser;
  }

  private getObjectEdit(request: ComunaDto, elementToEdit: Comunas): Comunas {
    const { descrip, estado } = request;
    if (typeof descrip !== 'undefined' && descrip !== null && descrip !== '') {
      console.log('descrip: [' + descrip + ']');
      elementToEdit.descrip = descrip;
    }
    if (typeof estado !== 'undefined' && estado !== null) {
      console.log('estado: [' + estado + ']');
      elementToEdit.estado = estado;
    }
    return elementToEdit;
  }

}