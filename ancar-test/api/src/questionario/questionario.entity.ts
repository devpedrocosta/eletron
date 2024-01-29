// questionario.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';


import { Usuario } from '../users/usuario.entity';
import { Pergunta } from '../pergunta/pergunta.entity';

@Entity()
export class Questionario {
    @PrimaryGeneratedColumn()
    cod: number;

    @Column()
    data: Date;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @ManyToOne(() => Usuario, usuario => usuario.questionarios)
    usuario: Usuario;

    @OneToMany(() => Pergunta, pergunta => pergunta.questionario)
    perguntas: Pergunta[];
}
