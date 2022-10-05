const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/paymentsController");
const axios = require("axios");
const mercadopago = require("mercadopago");
// const { payment } = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);
const { Order, Artwork, Addresses } = require("../db");
const { Router } = require("express");
const { resetUserCart } = require("../controllers/cartController");

router.post("/", async (req, res) => {
  const { payload, user, adress } = req.body; // headers? body?
  const cart = payload;
  const usuario = user[0];

  // console.log(req.body, 'payload')
  // console.log(user[0], 'user')

  let artworks = cart.map((a) => {
    return {
      id: a.id,
      title: a.title,
      currency_id: "ARS",
      picture_url: a.image,
      creator: a.creator,
      category_id: "art",
      quantity: 1,
      unit_price: Number(a.price),
      email: usuario.email,
    };
  });
  // artworks.push({email:usuario.email})
  const preference = {
    items: artworks,
    payer: { email: usuario.email },
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
      success: "http://localhost:3002/MainPage",
      failure: "http://www.failure.com",
      pending: "http://www.pending.com",
    },
    auto_return: "approved",
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket",
        },
      ],
      installments: 12,
    },
    shipments:{
      envio: `Your order has been dispatched and will be shipped to ${adress.street} ${adress.number}`
    },
    metadata:{
      userId: usuario.id,
      email: usuario.email,
      
    },
    additional_info:
       `The order has been dispatched and will be shipped to ${adress.street} ${adress.number}`
    ,
    notification_url: `https://c4fc-181-232-255-29.sa.ngrok.io/payment/notifications`,
    statement_descriptor: "ARTKET",
  };
  try {
    mercadopago.preferences
      .create(preference)
      .then(function (preference) {
        const linkMP = preference.response.init_point;
        // console.log(linkMP);
        return res.status(200).send(linkMP);
      })
      .catch(function (error) {
        res.send(200);
        console.log(error);
      });
  } catch (error) {
    res.send(200);
    console.log(error);
  }
});

router.post("/notifications", async (req, res) => {
  const data = req.query;
  const topic = data.topic || data.type;

  try {
    var merchantOrder;
    var idPayer;
    var emailPayer;
    var asd = [];
    // console.log(data);
    if (topic) {
      switch (topic) {
        case "payment":
          const paymentId = data.id || data["data.id"];
          var { response } = await mercadopago.payment.findById(paymentId);
          // console.log(pagos.body, "pagos body")
          // console.log(pagos.response, "PAGOS RESPONSE")
          //  idPayer = pagos.response.payer.id
          //  emailPayer = pagos.response.payer.email
          //  console.log(idPayer, emailPayer, "DATA PAYEEEEEEEEEEEEEER")
          // merchantOrder = await mercadopago.merchant_orders.findById(pagos.body.order.id)
          break;
        case "merchant_order":
          const orderId = data.id;
        //   console.log(topic, "getting order", orderId);
          var { body } = await mercadopago.merchant_orders.findById(orderId);
          res.status(200)
          break;
      }

      // console.log(body, 'ORDEN BODY')
      if (response) {
        if (response.status == "approved") {
          let idPagador = response.payer.id;
          let emailPagador = response.metadata.email;
          let pagoId = response.id;
          let pagoStatus = response.status;
          let montoPago = response.transaction_details.total_paid_amount;
          let ordenID = response.order.id;
          let envio = response.metadata.envio
          asd.push({
            payId: idPagador,
            payEmail: emailPagador,
            paymentID: pagoId,
            paymentStatus: pagoStatus,
            paymentAmount: montoPago,
            orderid: ordenID,
            adress: envio
          });
        } else if (response.status != "approved") {
          let idPagador = response.payer.id;
          let pagoId = response.id;
          let pagoStatus = response.status;
          let montoPago = response.transaction_details.total_paid_amount;
          let ordenID = response.order.id;
          let emailPagador = response.metadata.email
          // let envio = response.metadata.envio
          asd.push({
            payId: idPagador,
            payEmail: emailPagador,
            paymentID: pagoId,
            paymentStatus: pagoStatus,
            paymentAmount: montoPago,
            orderid: ordenID,
            // adress: envio
          });
        }
        const payment = Order.findOne({
          where: { orderid: response.order.id },
        });

        if (!payment.length) {
          if (asd.length) {
            if (asd[0].paymentStatus == "approved") {
              await Order.bulkCreate(asd);
              response.additional_info.items.forEach(async (e) => {
                // console.log(e)
                await Artwork.update({ show: false }, { where: { id: e.id } });
                await resetUserCart(asd[0].payEmail);
                res.status(200)
              });
            } else if (asd[0].paymentStatus == "rejected") {
              await Order.bulkCreate(asd)
              // await Addresses.setOrder(response.order.id)
              res.status(200)
            }
          } else {
            console.log("no anda culi");
            res.status(200);
          }
          res.status(200);
        }
        res.status(200);
      }
      res.status(200);
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(200).send(error);
  }
});

router.get("/orden", async (req, res) => {
  //mostrar una orden en particular

  const { payload } = req.headers;
  try {
    if(payload){
    let pago = await Order.findOne({ where: { payEmail: payload } });
    let orders = await axios.get(
      `https://api.mercadopago.com/merchant_orders/search?payer_id=${pago.payId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    // console.log(orders.data.elements)
    let datos = orders.data.elements;
   
    let response = datos.map((e) => {
      return {
        orderId: e.id,
        paymentId: e.payments[0].id,
        paymentAmount: e.payments[0].total_paid_amount,
        paymentStatus: e.payments[0].status,
        paymentDetail: e.payments[0].status_detail,
        items: e.items,
        cancelled: e.cancelled,
        order_status: e.order_status,
        date_created:e.date_created.split('T', 1),
        adress: e.additional_info
      };
    });
    res.send(response);
  } 
  let orders = await axios.get(
    `https://api.mercadopago.com/merchant_orders/search`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    }
  );
  console.log(orders.data.elements)
  let datos = orders.data.elements;
 
  let response = datos?.map((e) => {
    return {
      orderId: e.id,
      paymentId: e.payments[0]?.id,
      paymentAmount: e.payments[0]?.total_paid_amount,
      paymentStatus: e.payments[0]?.status,
      paymentDetail: e.payments[0]?.status_detail,
      items: e.items,
      cancelled: e.cancelled,
      order_status: e.order_status,
      date_created:e.date_created.split('T', 1),
      adress: e.additional_info
    };
  });
  res.send(response);

  } catch (error) {
    console.log(error);
  }
});
 
router.get("/orden/:id", async (req, res) => {
  const data = req.params;
   
  try {
    let orden = await axios.get(
      `https://api.mercadopago.com/merchant_orders/${data.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    let datos = [];
    datos.push(orden.data);
    let response = datos.map((e) => {
      return {
        orderId: e.id,
        paymentId: e.payments[0].id,
        paymentAmount: e.payments[0].total_paid_amount,
        paymentStatus: e.payments[0].status,
        paymentDetail: e.payments[0].status_detail,
        items: e.items,
        cancelled: e.cancelled,
        order_status: e.order_status,
        date_created: e.date_created.split('T', 1),
        adress: e.additional_info
      };
    });
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

router.get("/pagos", async (req, res) => {
  try {
    // let ordenes = await Order.findAll()
    let pagos = await axios(
      `https://api.mercadopago.com/merchant_orders/search`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
    let data = pagos.data.elements;
    let infoPagos = data.map((e) => {
      return {
        orderId: e.id,
        paymentId: e.payments[0].id,
        paymentAmount: e.payments[0].total_paid_amount,
        paymentStatus: e.payments[0].status,
        paymentDetail: e.payments[0].status_detail,
        cancelled: e.cancelled,
        order_status: e.order_status,
        date_created:e.date_created.split('T', 1),
        adress: e.additional_info
      };
    });
    // console.log(pagos.data.elements)
    res.send(infoPagos);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
