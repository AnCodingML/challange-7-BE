// carService.ts

import CarsRepository, { carsType } from '../repositories/carsRepository';

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
                cars = await CarsRepository.findAll();
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
}
