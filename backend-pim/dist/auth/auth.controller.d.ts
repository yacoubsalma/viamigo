import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UsersService);
    forgotPassword(email: string): Promise<string>;
    login(loginData: {
        email: string;
        password: string;
    }): Promise<{
        accessToken: string;
        id: string;
    }>;
    resetPasswordWithOtp(email: string, otp: string, newPassword: string): Promise<string>;
    verifyOtp(email: string, otp: string): Promise<{
        message: string;
    }>;
    confirmEmail(id: string, res: Response, req: Request): Promise<void | Response<any, Record<string, any>>>;
}
