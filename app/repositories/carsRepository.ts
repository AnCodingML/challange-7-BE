// import {MaybeCompositeId} from "objection";
import {CarsModel, Cars} from "../models/cars";

export type carsType = Cars;
interface FilterParams {
    driverType?: string;
    rentalTime?: string;
    passengerCount?: number;
}

export default new class CarsRepository {
    async findAll() {
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
  async find({ driverType, rentalTime, passengerCount }: FilterParams) {
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

    if (passengerCount) {
        query.where('capacity', '>=', passengerCount);
    }

    const [total, data] = await Promise.all([
        query.resultSize(),
        query.select()
    ]);
    return {
        data,
        total
    };
}
  
}