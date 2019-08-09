import { Request, Response, NextFunction, RequestHandler } from 'express'
import { Err } from './interfaces'

export const wrap = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next)

export function error(status: number, message: string, data?: any): Error {
  let err = new Error(message) as Err
  err.status = status
  err.data = data
  return err
}
