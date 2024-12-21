import { Exclude, Expose } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' }) // Explicitly specify the table name
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, default: "" })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' }) // Automatically set creation timestamp
    createdAt: Date;

    @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) // Update timestamp on changes
    updatedAt: Date;
}