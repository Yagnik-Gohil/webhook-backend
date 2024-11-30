import { Token } from '@modules/token/entities/token.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MESSAGE } from '@shared/constants/constant';
import { IJwtPayload } from '@shared/constants/types';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

@Injectable()
export class WebhookService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  async validateTokenAndGetUserId(token: string): Promise<string> {
    const payload: IJwtPayload = await jwt.verify(
      token,
      process.env.JWT_SECRET,
    );
    if (!payload) {
      throw new UnauthorizedException(MESSAGE.UNAUTHENTICATED);
    }
    const isExists = await this.tokenRepository.findOne({
      where: {
        user: { id: payload.id },
        jwt: token,
      },
      relations: {
        user: true,
      },
    });

    if (!isExists) {
      throw new UnauthorizedException(MESSAGE.UNAUTHENTICATED);
    }

    return isExists.user.id;
  }
}
