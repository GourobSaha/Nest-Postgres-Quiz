import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
            ignoreExpiration: false, // Token expiration is handled
            secretOrKey: process.env.JWT_SECRET, // Secret key for signing JWTs
        });
    }

    // This method is called if the token is valid, attaches the decoded payload to req.user
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}
