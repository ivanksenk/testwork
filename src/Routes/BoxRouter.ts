import { boxTariffsUpdator } from "#WbApi/services/boxTariffsUpdator.service.js";
import { Request, Response, Router } from "express";
export const boxRouter = Router();

boxRouter.get('/', async (req: Request, res: Response) => {
    try {
        res.send({ message: 'Задача добавлена в очередь' })
        await boxTariffsUpdator.updateData();
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: true, message: 'Произошла ошибка, попробуйте позднее' })
    }
})

