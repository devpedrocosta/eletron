import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { ApiTags, ApiCreatedResponse, ApiBadRequestResponse, ApiDefaultResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { LoginDto } from './login.class';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  @ApiDefaultResponse({ description: 'Todos dados.' })
  @ApiBadRequestResponse({ description: 'Erro ao buscar usuário.' })
  async findAll(): Promise<{ data: Usuario[], total: number }> {
    return this.usuarioService.findAll();
  }

  @Get(':cpf')
  @ApiDefaultResponse({ description: 'Apenas 1 usuario.' })
  @ApiBadRequestResponse({ description: 'Erro ao buscar usuário.' })
  async getByCPF(@Param('cpf') cpf: string): Promise<Usuario> {
    return this.usuarioService.getByCPF(cpf);
  }
  @Post('login')
  @ApiDefaultResponse({ description: 'Login.' })
  @ApiBadRequestResponse({ description: 'Erro ao logar usuário.' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.usuarioService.validateUser(loginDto.cpf, loginDto.password);
    if (!user) {
      return { message: 'Usuário ou senha inválidos' };
    }
    return user;
  }

  @Post()
  @ApiDefaultResponse({ description: 'Sucesso ao cadastrar.' })
  @ApiBadRequestResponse({ description: 'Erro ao buscar usuário.' })
  async create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Usuário atualizado com sucesso.' })
  @ApiNotFoundResponse({ description: 'Usuário não encontrado.' })
  @ApiBadRequestResponse({ description: 'Erro ao atualizar usuário.' })
  async update(@Param('id') id: number, @Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.update(id, usuario);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usuarioService.remove(id);
  }
}
