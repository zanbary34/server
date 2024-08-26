import { Files } from 'src/files/entities/file.entity';
import { Relation } from 'typeorm';
export declare class Users {
    u_id: number;
    u_name: string;
    files: Relation<Files[]>;
}
