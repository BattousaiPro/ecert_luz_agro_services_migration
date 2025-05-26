import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'COMUNAS' })
export class Comunas {

    @PrimaryGeneratedColumn({ name: 'codigo' })
    codigo: number;

    @Column({ name: 'descrip' })
    descrip: string;

    @Column({ name: 'estado' })
    estado: boolean;

}