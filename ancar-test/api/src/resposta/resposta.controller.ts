// questionario.controller.ts
import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';

import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { QuestionarioService } from './resposta.service';
import { Questionario } from 'src/questionario/questionario.entity';

@ApiTags('questionarios')
@Controller('questionarios')
export class QuestionarioController {
    constructor(private readonly questionarioService: QuestionarioService) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Retorna todos os questionários paginados.' })
    async findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10): Promise<Questionario[]> {
        return this.questionarioService.findAll(page, limit);
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'Retorna um questionário pelo ID.' })
    async findById(@Param('id') id: number): Promise<Questionario> {
        return this.questionarioService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, description: 'Cria um novo questionário.' })
    async create(@Body() questionario: Questionario): Promise<Questionario> {
        return this.questionarioService.create(questionario);
    }

    @Patch(':id')
    @ApiResponse({ status: 200, description: 'Atualiza um questionário pelo ID.' })
    async update(@Param('id') id: number, @Body() questionario: Questionario): Promise<Questionario> {
        return this.questionarioService.update(id, questionario);
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'Remove um questionário pelo ID.' })
    async delete(@Param('id') id: number): Promise<void> {
        return this.questionarioService.delete(id);
    }
}
