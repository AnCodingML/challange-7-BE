import CarsRepository, { carsType } from '../repositories/carsRepository';
import cloudinary from '../middleware/cloudinary';
import { UUID } from "crypto";
import { JSONSchemaArray } from "objection";

interface FilterParams {
    driverType?: string;
    rentalTime?: string;
    passengerCount?: number;
    sizeCar?: string;
    searchCar?: string;
    options?: JSONSchemaArray,
    specs?: JSONSchemaArray,
    id?: UUID
}

interface File {
    buffer: Buffer;
    mimetype: string;
    // add other properties if needed
}

export default new class CarService {
    async list(query: FilterParams) {
        let cars;

        if (!query) {
            cars = await CarsRepository.findAllCar();
        } else {
            const filters: FilterParams = {
                driverType: query.driverType,
                rentalTime: query.rentalTime,
                passengerCount: query.passengerCount !== undefined ? parseInt(query.passengerCount.toString(), 10) : undefined,
                sizeCar: query.sizeCar,
                searchCar: query.searchCar,
                id: query.id
            };

            cars = await CarsRepository.find(filters);
        }

        return {
            data: cars.data,
            count: cars.total
        };
    }

    async create(requestBody: carsType) {
        CarsRepository.create(requestBody);
        console.log(requestBody);
    }

    async delete(id: UUID) {
        return CarsRepository.delete(id);
    }

    async update(id: UUID, requestBody: carsType) {
        return CarsRepository.update(id, requestBody);
    }

    async upload(file: File) {
        console.log(file);
        const fileBase64 = file.buffer.toString('base64');
        const fileString = `data:${file.mimetype};base64,${fileBase64}`;

        return cloudinary.uploader.upload(fileString);
    }

    async deleteImg(id: UUID) {
        const nameImg = await CarsRepository.findImage(id);
        if (nameImg && nameImg.image) {
            const result = await cloudinary.uploader.destroy(nameImg.image);
            return result;
        } else {
            throw new Error('Image not found');
        }
    }
}
