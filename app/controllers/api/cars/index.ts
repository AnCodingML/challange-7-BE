import { Request, Response } from 'express';
import CarsService from '../../../services/carService';

async function getCars (req:Request, res:Response){
   try {
      const result = await CarsService.list(req.query);

      res.status(200).json(result);
  } catch (error:any) {
      res.status(500).json({ message: error.message });
  }
}

export default {
    getCars}