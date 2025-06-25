import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SECTOR' })
export class Sector {

    @PrimaryGeneratedColumn({ name: 'codigo' })
    codigo: number;

    @Column({ name: 'dia_car' })
    dia_car: number;

    @Column({ name: 'cod_cob' })
    cod_cob: number;

    @Column({ name: 'estado' })
    estado: boolean;

    @Column({ name: 'descrip' })
    descrip: string;

}
/*
  `codigo` int(11) NOT NULL AUTO_INCREMENT,
  `dia_car` int(11) NOT NULL,
  `cod_cob` int(11) NOT NULL,
  `estado` tinyint(4) NOT NULL,         -> boolean
  `descrip` varchar(255) NOT NULL,
*/