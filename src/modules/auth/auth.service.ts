import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async register(createAuthDto: CreateAuthDto) {
    try {
      const { username } = createAuthDto;
      const existingUser = await this.userRepository.findOne({ where: { username } });
      if (existingUser) {
        throw new UnauthorizedException('User already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(createAuthDto.password, 10);

      const newUser = this.userRepository.create({
        ...createAuthDto,
        password: hashedPassword, // Use the hashed password
      });

      return this.userRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }


  async validateUser(loginAuthDto: LoginAuthDto): Promise<any> {
    try {
      const { username, password } = loginAuthDto;
      const user = await this.userRepository.findOne({ where: { username } });

      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findUserById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }
}
