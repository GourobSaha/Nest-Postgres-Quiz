import { Type } from "class-transformer";
import { IsInt, Min, IsString, MaxLength, IsBoolean, Max, IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize } from "class-validator";

class OptionDto {
    @IsInt()
    @Min(1)
    optionNo: number;

    @IsString()
    @MaxLength(200)  // Adjust this value as needed
    optionText: string;

    @IsBoolean()
    isCorrect: boolean;
}

export class CreateQuestionDto {
    @IsString()
    @MaxLength(500)  // This should match the length in your entity
    questionText: string;

    @IsInt()
    @Min(1)
    @Max(100)  // Adjust max marks as needed
    marks: number;

    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)  // Minimum 2 options
    @ArrayMaxSize(6)  // Maximum 6 options, adjust as needed
    @Type(() => OptionDto)
    options: OptionDto[];
}
