import { Request, Response } from 'express';
import RequestError from "../../constants/errors";
import BaseController from "../index";
import Joi from "joi";

export class CartoController extends BaseController {
    public add = async (req: Request, res: Response) => {
        try {
            const name = req.body["product_name"];
            const data = await this.db("cart").select('*').where("product_name", name).first();
            if (data) throw new RequestError('Product already exists', 400);

            await this.db("cart").insert(req.body);
            res.status(201);
            res.send('ok');
        } catch (err) {
            res.status(err.statusCode || 500);
            res.send(err.message || 'Something went wrong');
        }
    }
}

export const createValidator = Joi.object().keys({
    product_name: Joi.string().required(),
    qty: Joi.string().required(),
    unitPrice: Joi.number().required(),
    userEmail: Joi.string().email().required(),
});