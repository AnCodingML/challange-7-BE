import {Model, ModelObject} from "objection";

export class CarsModel extends Model {
   id!: number;
   plate!: string;
   manufacture!: string | null;
   model!: string | null;
   image!: string | null;
   rentPerDay!: number | null;
   capacity!: number | null;
   description!: string | null;
   availableAt!: string | null;
   transmission!: string | null;
   available!: boolean;
   type!: string | null;
   year!: number | null;
   options!: string | null;
   specs!: string | null;
   created_by!: string;
   updated_by!: string;
   created_at!: string;
   updated_at!: string;

   static get tableName() {
      return "cars"
   }
}

export type Cars = ModelObject<CarsModel>;