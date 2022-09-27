const { Artwork, User, Favourite } = require("../db");
const { Router } = require("express");
const getFavs = require("../controllers/favouriteController");
const router = Router();

// router.post("/", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const artworkbyId = Artwork.findByPk(id);
//     // let addFavourite = await Favourite.findOrCreate({
//     //   where: { id: artworkById.id },
//     // });
//     // let userId = await Users.findOne({
//     //   where: { id: user.id },
//     // });
//     // addFavourite.setUsers(userId);
//     res.send("Artwork added to favourites");
//   } catch (error) {
//     console.log(error.message);
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { email, artworkId } = req.body;
    let userFavourites = await getFavs(email)
    let newFavourite = await Favourite.create()
    let product = await Artwork.findByPk(artworkId)
    let user = await User.findOne({where:email})
    await user.addFavourite(newFavourite)
    await product.addFavourite(newFavourite)
    return res.send('agregado a fav')
  } catch (error) {
    console.log(error)
    res.status(400).send(error.message);
  }
});

router.delete('/', async(req, res) =>{
  try {
    const {favouriteId} = req.body
    await Favourite.destroy({where: favouriteId})  
  } catch (error) {
    return console.log(error)
  }
  
})


// router.get("/", async (req, res) => {
//   const {email} = req.body
//   try {
//     let userFavourites = await getFavs(email);
//     console.log(userFavourites)
//     userFavourites = userFavourites.map((f) => {
//     return { id: f.id, artwork: f.artwork };
//     });
//     return res.status(200).send({ favourites: userFavourites })
//   } catch (error) {
//     console.log(error)
//   }
// });



module.exports = router;
