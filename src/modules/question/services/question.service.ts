import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from '../entities/question.entity';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) { }

  async findAll() {
    try {
      const questions = await this.questionRepository.find();
      return questions;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  }
  
  async findOne(id: number) {
    try {
      const question = await this.questionRepository.findOneBy({ id: +id });
      return question;
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  }
  
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    try {
      const question = this.questionRepository.create({
        questionText: createQuestionDto.questionText,
        marks: createQuestionDto.marks,
        options: createQuestionDto.options.map(option => ({
          optionNo: option.optionNo,
          optionText: option.optionText,
          isCorrect: option.isCorrect,
        })),
      });

      return await this.questionRepository.save(question);
    } catch (error) {
      console.error('Error creating question:', error);
      throw error;
    }
  }

  async update(questionId: number, updateQuestionDto: UpdateQuestionDto): Promise<Question> {
    try {
      const question = await this.questionRepository.findOneBy({ id: questionId });

      if (!question) {
        throw new Error('Question not found');
      }

      if (updateQuestionDto.questionText) {
        question.questionText = updateQuestionDto.questionText;
      }

      if (updateQuestionDto.marks) {
        question.marks = updateQuestionDto.marks;
      }

      if (updateQuestionDto.options) {
        question.options = updateQuestionDto.options.map(option => ({
          optionNo: option.optionNo,
          optionText: option.optionText,
          isCorrect: option.isCorrect,
        }));
      }

      return await this.questionRepository.save(question);
    } catch (error) {
      console.error('Error updating question:', error);
      throw error;
    }
  }

  async remove(id: number) {
    try {
      const question = await this.questionRepository.findOneBy({ id });
      if (!question) {
        throw new Error('Question not found');
      }

      return await this.questionRepository.remove(question);
    } catch (error) {
      console.error('Error deleting question:', error);
      throw error;
    }
  }
}
