import { Router } from 'express'
const router = Router()

router.use('/user', require('./controllers/user'))

module.exports = router
