const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/paymentsController");
const axios = require("axios");
const mercadopago = require("mercadopago");
// const { payment } = require('mercadopago');
mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN);
const { Order, Artwork } = require("../db");
const { Router } = require("express");
const { resetUserCart } = require("../controllers/cartController");

router.post("/", async (req, res) => {
  const { payload, user } = req.body; // headers? body?
  const cart = payload;
  const usuario = user[0];

  // console.log(payload[0], 'payload')
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
  console.log(usuario);
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
      success: "http://localhost:3000/MainPage",
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
    notification_url: `https://ad03-186-19-162-206.sa.ngrok.io/payment/notifications`,
    statement_descriptor: "ARTKET",
  };
  try {
    mercadopago.preferences
      .create(preference)
      .then(function (preference) {
        const linkMP = preference.response.init_point;
        console.log(linkMP);
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
  const topic = data.topic;

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
          console.log(topic, "getting payment", paymentId);
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
    //   console.log(response, "pago BODY");
      if (response) {
        if (response.status == "approved") {
          let idPagador = response.payer.id;
          let emailPagador = response.payer.email;
          let pagoId = response.id;
          let pagoStatus = response.status;
          let montoPago = response.transaction_details.total_paid_amount;
          let ordenID = response.order.id;
          asd.push({
            payId: idPagador,
            payEmail: emailPagador,
            paymentID: pagoId,
            paymentStatus: pagoStatus,
            paymentAmount: montoPago,
            orderid: ordenID,
          });
          // console.log(response, 'ID DE PAYMENT')
        } else if (response.status != "approved") {
          let idPagador = response.payer.id;
          let pagoId = response.id;
          let pagoStatus = response.status;
          let montoPago = response.transaction_details.total_paid_amount;
          let ordenID = response.order.id;
          asd.push({
            payId: idPagador,
            payEmail: "-",
            paymentID: pagoId,
            paymentStatus: pagoStatus,
            paymentAmount: montoPago,
            orderid: ordenID,
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
                await Artwork.update({ show: false }, { where: { id: e.id } });
                await resetUserCart(asd[0].payEmail);
                res.status(200)
              });
            } else if (asd[0].paymentStatus == "rejected") {
              await Order.bulkCreate(asd);
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

  const { email } = req.body;
  try {
    let pago = await Order.findAll({ where: { payEmail: email } });
    let orders = await axios.get(
      `https://api.mercadopago.com/merchant_orders/search?payer_id${pago.payId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      }
    );
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
      };
    });
    res.send(orders.data.elements);
  } catch (error) {
    console.log(error);
  }
});

router.get("/orden/:id", async (req, res) => {
  const data = req.params;
  // console.log(data)
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
      };
    });
    // console.log(pagos.data.elements)
    res.send(infoPagos);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
