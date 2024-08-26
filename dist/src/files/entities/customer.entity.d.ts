import { Relation } from 'typeorm';
import { Files } from './file.entity';
export declare class Customers {
    c_id: number;
    c_name: string;
    c_email: string;
    c_israeli_id: string;
    f_id: number;
    file: Relation<Files>;
}
