import { Request, Response, Router } from "express";
import { boxRouter } from "./BoxRouter.js";

export const mainRouter = Router();

mainRouter.get('/', (req: Request, res: Response) => {
    try {
        res.send({title:'BoxTariffs API'})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: 'Произошла ошибка, попробуйте позднее' })
    }
})
mainRouter.use('/box', boxRouter);