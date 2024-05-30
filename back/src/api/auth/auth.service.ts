import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interfaces/auth-service.interface';
import { UserService } from 'src/api/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    const user = await this.userService.findUserByEmail({ userEmail: email });

    if (!user) {
      throw new UnprocessableEntityException('존재 하지 않는 이메일 입니다.');
    }

    const isAuthentication = await bcrypt.compare(password, user.password);
    if (!isAuthentication) {
      throw new UnprocessableEntityException('비밀번호가 틀렸습니다.');
    }
    this.setRefreshToken({ user, context });

    return this.getAccessToken({ user });
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      {
        userId: user.id,
      },
      { secret: process.env.REFRESH_TOKEN_PASSWORD, expiresIn: '23h' },
    );

    context.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true, // HTTPS에서만 전송
      sameSite: 'none', // CORS를 고려한 설정
    });
    // // 쿠키 옵션 설정
    // const cookieOptions = [
    //   `refreshToken=${refreshToken}`,
    //   'HttpOnly', // 클라이언트 측 JavaScript에서 쿠키 접근 불가
    //   'Secure', // HTTPS 연결에서만 전송
    // ];

    // context.res.setHeader('Set-Cookie', cookieOptions.join('; '));
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { userId: user.id },
      { secret: process.env.ACCESS_TOKEN_PASSWORD, expiresIn: '1h' },
    );
  }
}
