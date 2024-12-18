// countries.model.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table({
    timestamps: false  // This disables createdAt and updatedAt columns
})
export class Country extends Model {
    @Column
    name: string;

    @Column
    code: string;

    @Column
    flag: string;

    @Column
    lat: number;

    @Column
    lng: number;

    @Column
    description: string;
}