import controllers from '../app/controllers'
import express, { Request, Response } from "express";

const apiRouter = express.Router()

apiRouter.route("/cars").get(controllers.cars.getCars)

export default {
    apiRouter
};