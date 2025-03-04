import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class LocationDispatch {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true})
    vehicle_number: string;

    @Column({ nullable: false })
    city: string;

}