import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { Options } from '../entities/options.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Options)
    private optionRepository: Repository<Options>,
  ) { }

  findAll() {
    return `This action returns all question`;
  }
  
  findOne(id: number) {
    return `This action returns a #${id} question`;
  }
  
  create(createQuestionDto: CreateQuestionDto) {
    try {
      const question = new Question();
      question.questionText = createQuestionDto.questionText;
      question.marks = createQuestionDto.marks;
      const options = createQuestionDto.options.map((option) => {
        const newOption = new Options();
        newOption.optionText = option.optionText;
        newOption.isCorrect = option.isCorrect;
        this.optionRepository.save(newOption);
        return newOption;
      });
      console.log('options', options);
      question.options = options;
      return this.questionRepository.save(question);
    } catch (error) {
      return error;
    }
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
