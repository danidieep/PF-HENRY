const express = require('express')
const router = express.Router()
const {createPayment} = require('../controllers/paymentsController')
const axios = require("axios");
const mercadopago = require('mercadopago');
// const { payment } = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN)
const {Order, User} = require('../db');
const { Router } = require('express');


router.post('/', async(req, res) =>{
    const {payload, user} = req.body // headers? body?
    const cart = payload
    const usuario = user[0]
    
    // console.log(payload[0], 'payload')
    // console.log(user[0], 'user')
    
    let artworks = cart.map((a) =>{
        return {
            id: a.id,
            title:a.title,
            currency_id: "ARS",
            picture_url: a.image, 
            creator: a.creator,
            category_id: "art",
            quantity: 1,
            unit_price: Number(a.price),
            email: usuario.email
        }
    })
    // artworks.push({email:usuario.email})
    console.log(usuario)
    const preference = {
        items: artworks,
        'payer': { email: usuario.email},
        //     name: usuario.name,
        //     surname: usuario.lastname,
        //     email: usuario.email,
        //     // address: {
        //     //     "street_name": "Street",
        //     //     "street_number": 123,
        //     //     "zip_code": "5700"
        //     // }
        // },
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
        notification_url: `https://a5a1-138-204-158-12.sa.ngrok.io/payment/notifications`,
        statement_descriptor: "ARTKET",
    } 
    try {
        mercadopago.preferences.create(preference)
        .then(function(preference){
            const linkMP = preference.response.init_point
            console.log(linkMP)
            return res.status(200).send(linkMP)
        }).catch(function(error){
            res.send(200)
            console.log(error);
        })
    } catch (error) {
        res.send(200)
        console.log(error)
    }
})

router.post('/notifications', async (req, res) =>{
    try {
    const data = req.query
    const topic = data.topic
    var merchantOrder;
    if(topic){
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
    console.log(merchantOrder.body)
    let ordenId = merchantOrder.body.id
    let pagoId = merchantOrder.body.payments[0].id
    let pagoStatus = merchantOrder.body.payments[0].status
        let statusOrden = merchantOrder.body.order_status
        let cancelado = merchantOrder.body.cancelled
        let idPagador = merchantOrder.body.payer.id
        let montoPago = merchantOrder.body.payments[0].total_paid_amount

        // let asd = merchantOrder.body.payments.map( e => {
        //     return {
        //         paymentID: e.id,
        //         paymentStatus:e.status,
        //         paymentAmount: e.total_paid_amount,
        //     }
        // })
        let asd = []
        asd.push({
            orderid: ordenId,
            paymentID: pagoId,
            paymentStatus:pagoStatus,
            paymentAmount: montoPago,
            payId: idPagador,
            cancelled: cancelado,
            order_status: statusOrden,
        })
        console.log(asd, 'ID DE PAYMENT')

const payment = Order.findOne({where: {orderid: merchantOrder.body.id}})

if(!payment.length) {
    if (asd.length) {
     await Order.bulkCreate(asd)
    //  await User.update(payId)
 } else {
     console.log('no anda culi')
 }
}
      
    }res.status(200).send('received')   
    } catch (error) {
        console.log(error)
         res.status(200).send(error)
        
    }
})

router.get('/orden', async (req, res) =>{ //mostrar una orden en particular
    const {id} = req.params
    try {
        let orden = await mercadopago.merchant_orders.findById(id)
        res.json(orden)
    } catch (error) {
        console.log(error)
    }
})



module.exports = router
