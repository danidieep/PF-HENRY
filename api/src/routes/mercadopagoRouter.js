const express = require('express')
const router = express.Router()
const {createPayment} = require('../controllers/paymentsController')
const axios = require("axios");
const mercadopago = require('mercadopago');
// const { payment } = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN)

router.post('/', async(req, res) =>{
    const {payload, user} = req.body // headers? body?
    const cart = payload
    const usuario = user[0]
    
    // console.log(payload[0], 'payload')
    // console.log(user[0], 'user')  necesito init point para redirigir
    
    let artworks = cart.map((a) =>{
        return {
            id: a.id,
            title:a.title,
            currency_id: "ARS",
            picture_url: a.image, 
            creator: a.creator,
            category_id: "art",
            quantity: 1,
            unit_price: Number(a.price)
        }
    })
    const preference = {
        items: artworks,
        payer: {
            name: usuario.name,
            surname: usuario.lastname,
            email: usuario.email,
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
        notification_url: `https://0277-186-19-162-206.sa.ngrok.io/payment/notifications`,
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
