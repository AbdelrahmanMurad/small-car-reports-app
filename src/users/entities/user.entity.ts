import { Report } from "src/reports/entities/report.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' }) // Explicitly specify the table name
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: true })
    admin: boolean;

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

    @OneToMany(() => Report, (report) => report.user)
    reports: Report[]; // why array ?? because group of reports

    /*
    @ManyToOne(() => User, (user) => user.reports)
    user: User // Reports to One User
    - () => User: This is a function that returns the target entity of the relationship, which is User in this case.
    - (user) => user.reports: This specifies the inverse side of the relationship. It means that the User entity has a property called reports that contains a collection of Report entities.
    - user: User: This defines a property named user in the Report entity that holds the related User entity.
    */

}