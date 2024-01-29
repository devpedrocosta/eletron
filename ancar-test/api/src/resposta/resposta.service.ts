// questionario.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Questionario } from 'src/questionario/questionario.entity';
import { Repository } from 'typeorm';


@Injectable()
export class QuestionarioService {
    constructor(
        @InjectRepository(Questionario)
        private questionarioRepository: Repository<Questionario>,
    ) { }

    async findAll(page: number = 1, limit: number = 10): Promise<Questionario[]> {
        return this.questionarioRepository.find({
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async findById(id: number): Promise<Questionario> {
        return this.questionarioRepository.findOne(id as any);
    }

    async create(questionario: Questionario): Promise<Questionario> {
        return this.questionarioRepository.save(questionario);
    }

    async update(id: number, questionario: Questionario): Promise<Questionario> {
        await this.questionarioRepository.update(id, questionario);
        return this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.questionarioRepository.delete(id);
    }
}
