import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './modules/question/question.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // If connecting from another machine, replace with the host machine's IP address
      port: 5432,
      username: 'root',
      password: 'gourob',
      database: 'default_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    QuestionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
