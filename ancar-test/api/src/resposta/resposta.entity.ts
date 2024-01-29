// resposta.entity.ts
import { Pergunta } from '../pergunta/pergunta.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Resposta {
    @PrimaryGeneratedColumn()
    cod: number;

    @Column()
    descricao: string;

    pergunta: Pergunta;
}
