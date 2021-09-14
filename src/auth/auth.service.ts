import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NutritionistsService } from '../nutritionists/nutritionists.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private nutritionistService: NutritionistsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.nutritionistService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id };

    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async refresh(token: string) {
    try {
      const tokenDecode = await this.jwtService.verifyAsync(token);

      const payload = { email: tokenDecode.email, sub: tokenDecode.sub };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new HttpException('Token inválido', HttpStatus.BAD_REQUEST);
    }
  }
}
