const express = require('express')
const router = express.Router()
const {createPayment} = require('../controllers/paymentsController')
const axios = require("axios");
const mercadopago = require('mercadopago');
const { payment } = require('mercadopago');


router.get('/', async(req, res) =>{
    const {cart, user} = req.body // headers? body?
    let artworks = cart.map((a) =>{
        return {
            id: a.id,
            title:a.title,
            currency_id: "ARS",
            picture_url: a.image, 
            creator: a.creator,
            category_id: "art",
            quantity: 1,
            unit_price: a.price
        }
    })
    const preference = {
        items: artworks,
        payer: {
            name: user.name,
            surname: user.lastname,
            email: user.email,
            // address: {
            //     "street_name": "Street",
            //     "street_number": 123,
            //     "zip_code": "5700"
            // }
        },
        back_urls: {
            "success": "https://www.success.com",
            "failure": "http://www.failure.com",
            "pending": "http://www.pending.com"
        },
        auto_return: "approved",
        payment_methods: {
            "excluded_payment_methods": [
                {
                    "id": "master"
                }
            ],
            "installments": 12
        },
        notification_url: `https://8433-138-204-158-12.sa.ngrok.io/payments/notifications`,
        statement_descriptor: "ARTKET",
    } 
    try {
        mercadopago.preferences.create(preference)
        .then(function(preference){
            console.log(preference)
            res.send(preference.body.init_point)
        }).catch(function(error){
            console.log(error);
        })
    } catch (error) {
        console.log(error)
    }
})

router.post('/notifications', async (req, res) =>{
    const data = req.query
    const topic = data.topic
    var merchantOrder;
    try {
       switch (topic) {
        case 'payment':
            const paymentId = data.id
            console.log(topic, 'getting payment', paymentId)
            const payment =await mercadopago.payment.findById(paymentId)
             merchantOrder = await mercadopago.merchant_orders.findById(payment.body.order.id)
            break;
        case 'merchant_order':
            const orderId = data.id
            console.log(topic, 'getting order', orderId)
            merchantOrder = await mercadopago.merchant_orders.findById(orderId)
            break;
    }

    console.log('log de orden', merchantOrder.body)
    res.status(200)
    } catch (error) {
        console.log(error)
         res.status(200).send(error)
        
    }
})

module.exports = router

