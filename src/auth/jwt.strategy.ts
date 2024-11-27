/* eslint-disable prettier/prettier */
// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET , // Clé secrète
    });
  }

  async validate(payload: any) {
    // Retourne les informations disponibles dans le payload
    return { id: payload.id, role: payload.role };
  }
}
