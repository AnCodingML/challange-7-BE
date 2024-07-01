// import {MaybeCompositeId} from "objection";
import { UUID } from "crypto";
import {CarsModel, Cars} from "../models/cars";
import { JSONSchemaArray } from "objection";

export type carsType = Cars;
interface FilterParams {
    driverType?: string;
    rentalTime?: string;
    passengerCount?: number;
    sizeCar?:string;
    searchCar?:string;
    options?:JSONSchemaArray,
    specs?: JSONSchemaArray,
    id?:UUID
}

export default new class CarsRepository {
    async findAllCar() {
        const query = CarsModel.query();
        const [total, data] = await Promise.all([
            query.resultSize(),
            query.select()
        ]);

        return {
            data,
            total
        }
    }
    async find({ driverType, rentalTime, passengerCount, sizeCar, searchCar, id }: FilterParams) {
        const query = CarsModel.query();

        if (driverType) {
            console.log("pilih tipe driver")
            if (driverType === 'With Driver') {
                query.where('type_rent', 'With Driver');
            } else if (driverType === 'Self Drive') {
                query.where('type_rent', 'Self Drive');
            }
        }

        if (rentalTime) {
            query.where('availableAt', '>', rentalTime);
        }
        if(id) {
            query.where('id', id);
        }

        if (passengerCount && !sizeCar) {
            query.where('capacity', '>=', passengerCount);
        }
        
        if (!passengerCount && sizeCar === 'Small' || 'Medium' || 'Large') {
            if (sizeCar === 'Small') {query.where('capacity', '<=', 2);}
            else if (sizeCar === 'Medium') {query.where('capacity', '>', 2).where('capacity', '<=', 4)} 
            else if (sizeCar === 'Large') {query.where('capacity', '>=', 5);} 
        }
        if(searchCar){query
            .where('plate', 'like', `%${searchCar}%`)
            .orWhere('manufacture', 'like', `%${searchCar}%`)
            .orWhere('model', 'like', `%${searchCar}%`)}

        const [total, data] = await Promise.all([
            query.resultSize(),
            query.select()
        ]);
        return {
            data,
            total
        };
    }

    async create(createArgs: carsType) {
        if (createArgs.options && !Array.isArray(createArgs.options)) {
            createArgs.options = JSON.parse(createArgs.options as unknown as string);
        }
        if (createArgs.specs && !Array.isArray(createArgs.specs)) {
            createArgs.specs = JSON.parse(createArgs.specs as unknown as string);
        }
        return CarsModel.query().insert(createArgs).returning('*')
    }

    async delete(id: UUID) {
        return CarsModel.query().deleteById(id).throwIfNotFound()
    }
    async findImage(id: UUID) {
        const carImg =  CarsModel.query().findById(id).select('image')
        return carImg
    }
    async update(id: UUID, updateArgs: Cars) {
        if (updateArgs.options && !Array.isArray(updateArgs.options)) {
            updateArgs.options = JSON.parse(updateArgs.options as unknown as string);
        }
        if (updateArgs.specs && !Array.isArray(updateArgs.specs)) {
            updateArgs.specs = JSON.parse(updateArgs.specs as unknown as string);
        }
        return CarsModel.query()
        .where({ id })
        .patch(updateArgs)
        .throwIfNotFound()
        .returning("*");
    }
  
}