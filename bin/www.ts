import { Request, Response } from "express";
import app from "../app"

const port = process.env.PORT || 3000;

app.get("/", (req:Request, res:Response) => {
   res.send("TypeScript Running using CI/CD")
})

app.listen(port, () => {
   console.log(`Running on port ${port}`)
})
