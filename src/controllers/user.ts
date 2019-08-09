import { Router, Request, Response } from 'express'
import * as bodyParser from 'body-parser'
import { User } from '../models'
import { wrap, error } from '../utils'

const router = Router()
const debug = require('debug')('ts-express:echo.controller')

router.post('/', bodyParser.json(), wrap(async (req: Request, res: Response) => {
  debug('[post] /user', req.query)
  const user = new User(req.body)

  try {
    const result = await user.save()
    res.json(result)
  } catch (e) {
    throw error(500, 'Database Error')
  }
}))

module.exports = router
