const { Artwork, Users, Favourite } = require("../db");
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

router.get("/", async (req, res) => {
  try {
    const getFav = await getFavs();
    if (getFav.length === 0) res.send("Theres nobody");
    else res.send(getFav);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { id } = req.body;
    const postUser = await createUser(name);
    res.send("User created succesfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
