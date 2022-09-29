const axios = require('axios')

const createPayment = async(cart, user) =>{
    
    const url = "https://api.mercadopago.com/checkout/preferences"
    // console.log(cart)
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
    // console.log(artworks)
    const body = {
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
            "excluded_payment_types": [
                {
                    "id": "ticket"
                }
            ],
            "installments": 12
        },
        notification_url: "https://www.your-site.com/ipn",
        statement_descriptor: "ARTKET",
        // expires: true,
        // expiration_date_from: "2016-02-01T12:00:00.000-04:00",
        // expiration_date_to: "2016-02-28T12:00:00.000-04:00"
    }
    
    const payment = await axios.post (url, body ,{
        headers:{
        "Content-Type" : "application/json",
        Authorization : `Bearer ${process.env.ACCESS_TOKEN}`
        }
    })
    return payment.data
}

module.exports= createPayment