import { Type } from 'class-transformer';
import { ArrayMaxSize, ValidateNested } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
class Option {
    @Column()
    optionNo: number;

    @Column()
    optionText: string;

    @Column()
    isCorrect: boolean;
}

@Entity('tblQuestion')
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionText: string;

    @Column()
    marks: number;

    @Column('jsonb', { nullable: false, default: [] })
    @ArrayMaxSize(6) // Set the maximum number of options here
    @ValidateNested({ each: true })
    @Type(() => Option)
    options: Option[];
}
