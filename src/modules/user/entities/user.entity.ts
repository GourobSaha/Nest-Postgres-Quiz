import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { IsEmail, IsEnum, IsString } from 'class-validator';
import * as bcrypt from 'bcryptjs';

export enum UserRole {
    ADMIN = 'admin',
    PARTICIPANT = 'participant',
}

@Entity('tblUsers')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsString()
    username: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.PARTICIPANT })
    @IsEnum(UserRole)
    role: UserRole;

    @CreateDateColumn()
    createdAt: Date;

    async setPassword(password: string) {
        this.password = await bcrypt.hash(password, 10);
    }

    async validatePassword(password: string) {
        return bcrypt.compare(password, this.password);
    }
}
