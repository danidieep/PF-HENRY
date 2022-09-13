const { Router } = require("express");
const getArtworks = require("../controllers/artworkController");
const router = Router();


router.get("/", async (req, res) => {
  try {
    const getArtworks = await getArtworks();
    console.log(getArtworks)
    res.send(getArtworks);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = nftsRouter;
