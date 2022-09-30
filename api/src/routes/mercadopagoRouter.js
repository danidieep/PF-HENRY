const createPayment = require('../controllers/paymentsController')
const { Router } = require("express");
const router = Router();

router.post('/', async(req, res) =>{
    const {payload, user} = req.body // headers? body?
    try {
        const payment = await createPayment(payload, user)
        res.send(payment.init_point)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router

