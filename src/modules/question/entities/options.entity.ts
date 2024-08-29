import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Options {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    optionText: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(() => Question, (question) => question.options)
    question: Question;
}
