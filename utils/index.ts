import {ObjectSchema, validate} from "joi";
import { Request, Response } from 'express';

export const isValid = (schema: ObjectSchema, key: "body" | "query" = "body") => {
    return async (req: Request, res: Response, next: Function) => {
        const result = validate(req[key], schema);
        if (result.error) {
            res.status(400);
            return res.send(result.error.details[0].message);
        } else {
            return next();
        }
    };
};