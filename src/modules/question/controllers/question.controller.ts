import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto, CreateOptionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Post('create')
  async create(
    @Res() res: Response, 
    @Req() req: Request,
    @Body() createQuestionDto: CreateQuestionDto, 
  ) {
    try {
      const question = await this.questionService.create(createQuestionDto);
      console.log('question', question);
      return res.status(201).json({
        message: 'Question created successfully',
        data: question,
      });
    } catch (error) {
      return error
    }

  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
