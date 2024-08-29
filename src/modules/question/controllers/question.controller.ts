import { Controller, Get, Post, Body, Param, Delete, Res, Req, Put } from '@nestjs/common';
import { Response, Request } from 'express';
import { QuestionService } from '../services/question.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Get()
  async findAll(
    @Res() res: Response, 
    @Req() req: Request,
  ) {
    try {
      const questions = await this.questionService.findAll();
      return res.status(200).json({
        statusCode: 200,
        message: 'Questions fetched successfully',
        data: questions,
      });
    } catch (error) {
      return error
    }
  }

  @Get(':id')
  async findOne(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string
  ) {
    try {
      const question = await this.questionService.findOne(+id);
      return res.status(200).json({
        statusCode: 200,
        message: 'Question fetched successfully',
        data: question,
      });
    } catch (error) {
      return error
    }
  }

  @Post('create')
  async create(
    @Res() res: Response, 
    @Req() req: Request,
    @Body() createQuestionDto: CreateQuestionDto, 
  ) {
    try {
      const question = await this.questionService.create(createQuestionDto);
      return res.status(201).json({
        statusCode: 200,
        message: 'Question created successfully',
        data: question,
      });
    } catch (error) {
      return error
    }

  }

  @Put('update/:id')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string, 
    @Body() updateQuestionDto: UpdateQuestionDto
  ) {
    try {
      const question = await this.questionService.update(+id, updateQuestionDto);
      return res.status(200).json({
        statusCode: 200,
        message: 'Question updated successfully',
        data: question,
      });
    } catch (error) {
      return error
    }
  }

  @Delete('delete/:id')
  async remove(
    @Res() res: Response,
    @Req() req: Request,
    @Param('id') id: string
  ) {
    try {
      await this.questionService.remove(+id);
      return res.status(200).json({
        statusCode: 200,
        message: 'Question deleted successfully',
      });
    } catch (error) {
      return error
    }
  }
}
