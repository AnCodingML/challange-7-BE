// carService.ts

import CarsRepository, { carsType } from '../repositories/carsRepository';
import cloudinary from '../middleware/cloudinary';
import { UUID } from "crypto";
import { JSONSchemaArray } from "objection";

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

export default new class CarService {
    async list(query: any) {
        try {
            let cars;

            if (!query) {
                cars = await CarsRepository.findAllCar();
            } else {
                const filters: FilterParams = {
                    driverType: query.driverType as string,
                    rentalTime: query.rentalTime as string,
                    passengerCount: query.passengerCount ? parseInt(query.passengerCount, 10) : undefined,
                    sizeCar: query.sizeCar as string,
                    searchCar: query.searchCar as string,
                    id:query.id as UUID
                };

                cars = await CarsRepository.find(filters);
            }

            return {
                data: cars.data,
                count: cars.total
            };
        } catch (err) {
            throw err;
        }
    }
    async create(requestBody:carsType) {
        CarsRepository.create(requestBody);
        console.log(requestBody)
    }
    async delete(id: UUID) {
        return CarsRepository.delete(id)
    }
    async update(id: UUID, requestBody: carsType) {
        return CarsRepository.update(id, requestBody)
    }

    async upload(file: any) {
        console.log(file)
        const fileBase64 = file.buffer.toString('base64');
        const fileString = `data:${file.mimetype};base64,${fileBase64}`;        
        try{
            const result = await cloudinary.uploader.upload(fileString);
            return result
        }
        catch(e) {
            throw(e)
        }
    }
    async deleteImg (id: UUID) {
        try {
        const nameImg = await CarsRepository.findImage(id)
        const result = await cloudinary.uploader.destroy(nameImg.image);
        return result;
        } catch (error) {
        throw error;
        }
    }
}
