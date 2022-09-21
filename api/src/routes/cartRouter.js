const router = require("express").Router();
const { User } = require("@auth0/auth0-react");
const {
    getCart,
    addArtworkInCart,
    deleteArtworkInCart,
    updateCart
} = require("../controllers/cart");
const sequelize = require("../db");
const {User, ArtworkInCarts, Artworks, Cart} = sequelize.models

router.post('/cart/:artworkId', async(req, res) =>{
    const {userId} = req.body
    const{artworkId} = req.params
    try{
        let artwork = await Artworks.findByPk(artworkId)
        if(!artwork.length){
            res.send({error: 'id del producto no es valido'})
        }
        let user = await User.findByPk(userId)
        let cart = await getCart(user.cartId)
        let artworkInCart = await addArtworkInCart(artworkId)
        let totalPrice = cart.totalPrice + artwork.price
        let existsArtworkInCart = cart.ArtworkInCarts.find((a) => a.artworkId === artworkId)
        if(existsArtworkInCart){
            alert('esta obra ya esta en su carrito')
        }else{
            await cart.addArtworkInCarts(artworkInCart)
        }
        await updateCart(totalPrice, user.cartId)
        cart = await getCart(user.id)
        return res.json({cart})
    }
    catch(err){console.log(err)}
})