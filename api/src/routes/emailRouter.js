const nodemailer = require('nodemailer')
const { Router } = require('express')
const router = Router();
const { User } = require("../db");

router.post('/', async (req, res) => {
    const {email} = req.body


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'artketgalery@gmail.com',
            pass: 'vvvicqjzjkocwjtd',
        },
        tls:{
            rejectUnauthorized:false
          }
    });

    const info = await transporter.sendMail({
        from: '"Arket" <artketgalery@gmail.com>',
        to: email,
        subject: 'Suscribed to newsletter',
        text: 'Thanks for suscribing to Arket newsletter'
    })


    
    res.status(200).send(info)
})

module.exports = router;