const express = require('express')
const router = express.Router()
const createPayment = require('../controllers/paymentsController')


router.get('/', async(req, res) =>{
    const {cart, user} = req.body // headers? body?
    try {
        const payment = await createPayment(cart, user)
        res.send(payment.init_point)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router

