// questionario.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questionario } from './questionario.entity';
import { QuestionarioService } from './questionario.service';
import { QuestionarioController } from './questionario.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Questionario])],
    controllers: [QuestionarioController],
    providers: [QuestionarioService],
    exports: [QuestionarioService],
})
export class QuestionarioModule { }
