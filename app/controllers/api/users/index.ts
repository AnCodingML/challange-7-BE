import { Request, Response } from 'express';
import { UsersModel } from '../../../models/users';
import { checkPassword, createToken } from '../../../utils/encrypt';

async function login(req:Request, res:Response){
   const { email, password } = req.body;
   const user = await UsersModel
       .query()
       .findOne({ email })
   
   if(!user){
       return res.status(404)
       .json({
           message: "Email tidak ditemukan!"
       })
   }

   const isPasswordCorrect = await checkPassword(user.password as string, password)

   if(!isPasswordCorrect){
       return res.status(401)
       .json({
           message: "Password salah!"
       })
   }

   const token = await createToken({
       id: user.id,
       email: user.email,
       role: user.role,
       createdAt: user.created_at,
       updatedAt: user.updated_at
   })

   res.status(201).json({
       message: "Berhasil Login",
       data: {
           id: user.id,
           email: user.email,
           nama: user.nama,
           role: user.role,
           avatar: user.avatar,
           token,
       }
   })
}



export default { login }