// pergunta.entity.ts
import { Questionario } from '../questionario/questionario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';


@Entity()
export class Pergunta {
    @PrimaryGeneratedColumn()
    cod: number;

    @Column()
    descricao: string;

    @ManyToOne(() => Questionario, questionario => questionario.perguntas)
    questionario: Questionario;
}
