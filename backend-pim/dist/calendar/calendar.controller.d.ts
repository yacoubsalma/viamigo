import { UsersService } from 'src/users/users.service';
export declare class CalendarController {
    private readonly userService;
    constructor(userService: UsersService);
    saveAvailability(body: any): Promise<{
        message: string;
    }>;
}
