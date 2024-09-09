import { Controller, Post, Body, UseGuards, UnauthorizedException, Res, Req, Get, Param } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { CreateAuthDto, LoginAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Res() res: Response,
    @Req() req: Request,
    @Body() createAuthDto: CreateAuthDto,
  ) {
    try {
      const user = await this.authService.register(createAuthDto);
      return res.status(200).json({
        statusCode: 200,
        message: 'Question created successfully',
        data: user,
      });
    } catch (error) {
      return error;
    }
  }

  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
    @Body() loginAuthDto: LoginAuthDto,
  ) {
    try {
      const user = await this.authService.validateUser(loginAuthDto);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const token = await this.authService.login(user);
      return res.status(200).json({
        statusCode: 200,
        message: 'User logged in successfully',
        data: token,
      });
    } catch (error) {
      return error;
    }
  }

  // Protected route
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async profile(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    try {
      const user = await this.authService.findUserById(id);
      return res.status(200).json({
        statusCode: 200,
        message: 'User profile retrieved successfully',
        data: user,
      });
    } catch (error) {
      return error;
    }
  }
}
