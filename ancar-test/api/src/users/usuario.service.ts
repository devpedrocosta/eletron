import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import * as bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken');
@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) { }

  async findAll(page = 1, limit = 10): Promise<{ data: Usuario[]; total: number; page: number }> {
    const [data, total] = await this.usuarioRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page };
  }

  async getByCPF(cpf: string): Promise<Usuario> {
    return await this.usuarioRepository.findOneBy({ cpf });
  }
  async create(usuario: Usuario): Promise<Usuario> {
    const hashedPassword = await this.hashPassword(usuario.senha);
    usuario.senha = hashedPassword;
    return this.usuarioRepository.save(usuario);
  }

  async update(cod: number, usuario: Usuario): Promise<Usuario> {
    await this.usuarioRepository.update(cod, usuario);
    return this.usuarioRepository.findOne(cod as any);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.getByCPF(username);

    if (user && await bcrypt.compare(password, user.senha)) {

      return this.generateToken(user);
    }
    return null;
  }

  async generateToken(user: any) {
    const payload = { ...user, date: new Date() };
    console.log(user.senha)
    return {
      access_token: jwt.sign(payload, 'teste_dev'),
      nome: user.nome
    };

  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decoded = jwt.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
