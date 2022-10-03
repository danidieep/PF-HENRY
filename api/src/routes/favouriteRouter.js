const router = require("express").Router();
const e = require("express");
const {
  getFav,
  addArtworkInFav,
  deleteArtworkInFav,
} = require("../controllers/favouriteController");
const { User, Artworkinfav, Artwork, Favourite } = require("../db");

router.post("/:artworkId", async (req, res) => {
  const { email } = req.body;
  const { artworkId } = req.params;
  try {
    let user = await User.findOne({ where: { email } });
    let favs = await Favourite.findOne({ where: { id: user.favId } });
    let artworkInFav = await addArtworkInFav(artworkId);
    await favs.addArtworkinfav(artworkInFav);
    favs = await getFav(user.id);
    return res.json({ favs });
  } catch (err) {
    console.log(err); 
  }
});





router.post("/delete/:artworkId", async (req, res) => {
  const { email } = req.body;
  const { artworkId } = req.params;
  try {
    let artwork = await Artwork.findByPk(artworkId);
    let user = await User.findOne({ where: { email } });
    let favs = await Favourite.findOne({ where: { id: user.favId } });
    let artworkInFav = await Artworkinfav.findOne({ where: { artworkId } })
    await deleteArtworkInFav(artworkInFav.dataValues.id);
    res.status(200)
  } catch (err) {
    console.log(err);
  }
});


router.get("/", async (req, res) => {
  try {
    const { payload } = req.headers;
    let user = await User.findOne({ where: { email: payload } });
    let favs = await Favourite.findOne({
      where: {
        id: user.dataValues.favId,
      },
      include: Artworkinfav,
    });
    let detailArt = favs.artworkinfavs
    let arr = []
    detailArt.map(async (e) => arr.push(Artwork.findOne({ where: { id: e.artworkId } })))
    await Promise.all(arr).then((resp) => {
      res.status(200).send(resp);
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});



router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    let user = await User.findByPk(userId);
    let fav = await Favourite.findOne({
      where: {
        id: user.favId
      },
      include: Artworkinfav
    })
    return res.status(200).send({ status: "Successfully obtained fav", fav });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
});


module.exports = router;