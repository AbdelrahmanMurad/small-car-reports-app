import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'reports' }) // Explicitly specify the table name
export class Report {
   @PrimaryGeneratedColumn()
   id: number;

   // Indicates whether the report has been approved by an admin.
   @Column({ type: 'boolean', default: false })
   approve: boolean;

   // The company that manufactured the vehicle (e.g., Honda, Hyundai, Toyota).
   @Column({ type: 'varchar', length: 50 })
   make: string;

   // The specific model of the vehicle (e.g., Mustang, Corolla, etc.).
   @Column({ type: 'varchar', length: 50 })
   model: string;

   // The year the vehicle was manufactured.
   @Column({ type: 'int', width: 4 })
   year: number;

   /* Mileage:
      The number of miles or kilometers the vehicle has been driven when sold.
      Vehicles with higher mileage usually have lower value.
   */
   @Column({ type: 'int', unsigned: true })
   mileage: number;

   /* Longitude (lng) and Latitude (lat):
      The location where the vehicle was sold. Vehicle prices can vary significantly based on the country or region of the sale.
   */
   @Column({ type: 'float', nullable: true })
   lng: number;

   @Column({ type: 'float', nullable: true })
   lat: number;

   // The sale price of the vehicle.
   @Column({ type: 'decimal', precision: 10, scale: 2, unsigned: true })
   price: number;

   /* Relation to User:
      A report is associated with one user (Many Reports -> One User).
      - () => User: Specifies the target entity of the relationship (User).
      - (user) => user.reports: Indicates the inverse side of the relationship, referencing the reports property in the User entity.
      - { onDelete: 'CASCADE' }: Ensures that when a User is deleted, all related Reports are also deleted.
   */
   @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' })
   user: User;
}