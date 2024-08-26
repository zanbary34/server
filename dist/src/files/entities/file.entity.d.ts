import { Relation } from 'typeorm';
import { Users } from '../../users/entities/user.entity';
import { Customers } from './customer.entity';
export declare class Files {
    f_id: number;
    f_name: string;
    f_status: string;
    user: Relation<Users>;
    customers: Relation<Customers[]>;
}
