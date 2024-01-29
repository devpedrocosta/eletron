import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './users/usuario.module';
import { resolve } from 'path';
import { QuestionarioModule } from './questionario/questionario.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    "name": "default",
    "type": "postgres",
    "logging": true,
    url: 'postgres://zugbviak:DgfhMtXaY9yPePPyax4kvrc5P42HB2O1@salt.db.elephantsql.com/zugbviak',
    entities: [
      resolve(__dirname, 'modules', '**', 'entity', '*.entity.{ts,js}'),
    ],
    synchronize: true,
    autoLoadEntities: true,
  }), UsuarioModule, QuestionarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
