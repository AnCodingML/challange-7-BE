import controllers from '../app/controllers'
import express, { Request, Response } from "express";
import uploadOnMemory from '../app/middleware/multerMemory'

const apiRouter = express.Router()

apiRouter.route("/cars")
    .get(controllers.cars.getCars)
    .post(uploadOnMemory.single('image'), controllers.cars.addCar)
    .delete(controllers.cars.deleteCar)
    .put(uploadOnMemory.single('image'),controllers.cars.updateCar)

export default {
    apiRouter
};