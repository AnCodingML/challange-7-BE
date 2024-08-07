import { Request, Response } from 'express';
import CarsService from '../../../services/carService';
import { UUID } from 'crypto';

async function getCars (req:Request, res:Response){
    try {
       const result = await CarsService.list(req.query);
 
       res.status(200).json(result);
   } catch (error: any) {
    res.status(500).json({ message: error.message });
    }
 }

async function addCar (req:any, res:Response){
    if(req.body.plate && 
        req.body.manufacture &&
        req.body.model &&
        req.body.rentPerDay &&
        req.body.capacity &&
        req.body.transmission &&
        req.body.available &&
        req.body.type &&
        req.body.year
    ){
        try {
            const fileUpload = await CarsService.upload(req.file);
            const car = await CarsService.create({
                ...req.body,
                image: fileUpload.public_id
            });
            return res.status(201).json(car);
        }catch(e){
            return res.status(400).send("Gagal upload file")
        }
    }
    return res.status(400).send("Invalid Request")

}

async function deleteCar(req: Request, res: Response) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).send("ID tidak boleh kosong");
    }

    try {
        await CarsService.deleteImg(id as UUID);
        await CarsService.delete(id as UUID);
        return res.status(200).send("Data berhasil di hapus");
    } catch (e) {
        return res.status(404).send("Data tidak ditemukan!");
    }
}

async function updateCar (req:any, res:Response){
    const { id } = req.query;
    if(!req.file) {
        try{
            const car = await CarsService.update(id, req.body);
            return res.status(202).send("Data berhasil di update")
        }
        catch(e){
            console.log(e)
            return res.status(400).send(e)
        }
    }
    try{
        const imageDelete = await CarsService.deleteImg(id);
        const fileUpload = await CarsService.upload(req.file);
        const car = await CarsService.update(id, {
            ...req.body,
            image: fileUpload.public_id
        });
        res.status(200).send("Data berhasil di update")
    }catch(e) {
        return res.status(400).send("Gagal upload file")
    }
}


export default {
    getCars,
    addCar,
    deleteCar,
    updateCar
}