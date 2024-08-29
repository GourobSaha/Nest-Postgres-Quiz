import { Type } from "class-transformer";
import { IsInt, Min, IsString, MaxLength, IsBoolean, Max, IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize, IsOptional } from "class-validator";
class OptionDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    optionNo?: number;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    optionText?: string;

    @IsOptional()
    @IsBoolean()
    isCorrect?: boolean;
}

export class UpdateQuestionDto {
    @IsOptional()
    @IsString()
    @MaxLength(500)
    questionText?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Max(100)
    marks?: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)
    @ArrayMaxSize(6)
    @Type(() => OptionDto)
    options?: OptionDto[];
}
