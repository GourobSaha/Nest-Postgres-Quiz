import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Options } from './options.entity';

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    questionText: string;

    @Column()
    marks: number;

    @OneToMany(() => Options, (option) => option.question)
    options: Options[];
}
