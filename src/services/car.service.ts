import { carRepository } from "../repositories/car.repository";
import { ICar } from "../types/car.type";

class CarService {
  public async getAll(): Promise<ICar[]> {
    return await carRepository.getAll();
  }

  public async createCar(dto: ICar): Promise<ICar> {
    return await carRepository.createCar(dto);
  }

  public async updateCar(carId: string, dto: Partial<ICar>): Promise<ICar> {
    return await carRepository.updateCar(carId, dto);
  }

  public async deleteCar(carId: string): Promise<void> {
    await carRepository.deleteCar(carId);
  }
}

export const carService = new CarService();
