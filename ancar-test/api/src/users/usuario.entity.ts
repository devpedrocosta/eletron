import { ApiProperty } from '@nestjs/swagger';
import { Questionario } from '../questionario/questionario.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';

@Unique('cpf_unique_constraint', ['cpf'])
@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('increment')
  cod: number;

  @Column()
  @ApiProperty()
  nome: string;

  @Column()
  @ApiProperty()
  senha: string;

  @Column({ unique: true })
  @ApiProperty()
  cpf: string;

  @OneToMany(() => Questionario, questionario => questionario.usuario)
  questionarios: Questionario[];
}