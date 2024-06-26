// carService.ts

import CarsRepository, { carsType } from '../repositories/carsRepository';
import cloudinary from '../middleware/cloudinary';
import { UUID } from "crypto";

interface FilterParams {
    driverType?: string;
    rentalTime?: string;
    passengerCount?: number;
}

export default new class CarService {
    async list(query: any) {
        try {
            let cars;

            if (!query) {
                cars = await CarsRepository.findAllCar();
            } else {
                // Parse the query parameters into the FilterParams type
                const filters: FilterParams = {
                    driverType: query.driverType as string,
                    rentalTime: query.rentalTime as string,
                    passengerCount: query.passengerCount ? parseInt(query.passengerCount, 10) : undefined,
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
        return CarsRepository.create(requestBody);
    }
    async delete(id: UUID) {
        return CarsRepository.delete(id)
    }

    async upload(file: any) {
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
            console.log(nameImg)
            console.log('Gambar di hapus:', result);
            return result;
          } catch (error) {
            console.error('Error hapus gambar:', error);
            throw error;
          }
    }
    
}
