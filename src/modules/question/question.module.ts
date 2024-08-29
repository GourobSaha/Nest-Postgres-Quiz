import { Module } from '@nestjs/common';
import { QuestionService } from './services/question.service';
import { QuestionController } from './controllers/question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule { }
