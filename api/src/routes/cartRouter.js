const router = require("express").Router();
const e = require("express");
// const { User } = require("@auth0/auth0-react");
const {
  getCart,
  addArtworkInCart,
  deleteArtworkInCart,
  updateCart,
} = require("../controllers/cartController");
const { User, Artworkincart, Artwork, Cart } = require("../db");
// const {User, ArtworkInCarts, Artworks, Cart} = sequelize.models

router.post("/:artworkId", async (req, res) => {
  const { email } = req.body;
  const { artworkId } = req.params;
  try {
    let artwork = await Artwork.findByPk(artworkId);
    // console.log(artwork)
    // if(!artwork){
    //     res.send({error: 'id del producto no es valido'})
    // }
    let user = await User.findOne({ where: { email } });
    let cart = await Cart.findOne({ where: { id: user.cartId } });
    let artworkInCart = await addArtworkInCart(artworkId);
    let totalPrice = cart.totalPrice + artwork.price;
    // console.log(total)
    // let existsArtworkInCart = cart.Artworkincart.find((a) => a.artworkId === artworkId)
    // if(existsArtworkInCart){
    //     alert('esta obra ya esta en su carrito')
    // }else{
    await cart.addArtworkincart(artworkInCart);
    await updateCart(totalPrice, user.cartId);
    cart = await getCart(user.id);
    return res.json({ cart });
  } catch (err) {
    console.log(err);
  }
});

// router.put('/artworkID', async(req, res) =>{
//     const {idU} = req.body
//     const{artworkId} = req.params
//     try {
//         let user = await User.findOne({where:{id:idU}})
//         let cart= await getCart(user.cartId);
//     } catch (error) {
//         console.log(err)
//     }
// })

router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    let user = await User.findByPk(userId);
    let cart = await Cart.findOne({
      where: {
        id: user.cartId,
      },
      include: Artworkincart,
    });
    return res.status(200).send({ cart });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let cart = await Cart.findAll();
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
