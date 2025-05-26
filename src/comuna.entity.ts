import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comuna {

    @PrimaryGeneratedColumn()
    codigo: number;

    @Column()
    descrip: string;

    @Column()
    estado: boolean;

}