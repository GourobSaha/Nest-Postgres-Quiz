import { IsString, IsNumber, IsArray, ArrayNotEmpty, IsBoolean } from 'class-validator';

export class CreateOptionDto {
    @IsString()
    optionText: string;

    @IsBoolean()
    isCorrect: boolean;
}

export class CreateQuestionDto {
    @IsString()
    questionText: string;

    @IsNumber()
    marks: number;

    @IsArray()
    @ArrayNotEmpty()
    options: CreateOptionDto[];
}
