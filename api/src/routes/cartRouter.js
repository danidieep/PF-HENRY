const router = require("express").Router();
// const { User } = require("@auth0/auth0-react");
const {
    getCart,
    addArtworkInCart,
    deleteArtworkInCart,
    updateCart
} = require("../controllers/cartController");
const {User, Artworkincart, Artwork, Cart} = require("../db");
// const {User, ArtworkInCarts, Artworks, Cart} = sequelize.models

router.post('/:artworkId', async(req, res) =>{
    const {idU} = req.body
    const{artworkId} = req.params
    // console.log(userId)
    try{
        let artwork = await Artwork.findByPk(artworkId)
        console.log(artwork)
        if(!artwork){
            res.send({error: 'id del producto no es valido'})
        }
        let user = await User.findOne({where:{id:idU}})
        console.log(user.cartId)
        let cart = await getCart(user.cartId)
        console.log(cart)
        let artworkInCart = await addArtworkInCart(artworkId)
        let totalPrice = cart.totalPrice + artwork.price
        console.log(totalPrice)
        // let existsArtworkInCart = cart.Artworkincart.find((a) => a.artworkId === artworkId)
        // if(existsArtworkInCart){
        //     alert('esta obra ya esta en su carrito')
        // }else{
        await cart.addArtworkincarts(artworkInCart)
        
        await updateCart(totalPrice, user.cartId)
        cart = await getCart(user.id)
        return res.json({cart})
    }
    catch(err){
        console.log(err)
    }
})

router.get("/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      
      let user= await User.findByPk(userId);
      let cart =  await Cart.findOne({
          where:{
              id:user.cartId
          },
          include: Artworkincart
      })
        return res.status(200).send({cart});
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error.message});
    }
  });




module.exports = router;