import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<Users>);
    findAll(): Promise<Users[]>;
}
