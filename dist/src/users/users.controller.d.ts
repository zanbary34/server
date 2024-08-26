import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    findAll(): Promise<import("./entities/user.entity").Users[]>;
}
