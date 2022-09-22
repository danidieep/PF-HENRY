const { Router } = require("express");
const getArtworks = require("../controllers/artworkController");
const createArtwork = require("../controllers/artworkPostController");
const { Artwork } = require("../db");
const router = Router();
var jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const { title } = req.query;
  const artworks = await getArtworks();
  if (title) {
    try {
      const arts = await Artwork.findAll({ where: { show: true } });
      const artworkByName = arts.filter((e) =>
        e.title.toUpperCase().includes(title.toUpperCase())
      );
      if (artworkByName.length) res.send(artworkByName);
      else res.status(400).send({ message: "Artwork does not found" });
    } catch (error) {
      res.status(404).send(error);
    }
  }
  try {
    const allArtworks = await getArtworks();
    const arts = await Artwork.findAll({ where: { show: true } });
    res.status(200).send(arts);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:idArtwork", async (req, res) => {
  try {
    const { idArtwork } = req.params;
    const getArtwork = await getArtworks();
    const artworkById = getArtwork.filter((e) => e.id === idArtwork);
    if (artworkById.length === 0)
      res.status(400).send({ message: "Artwork does not found" });
    else res.send(artworkById);
  } catch (error) {
    res.status(404).send(error);
  }
});

const ensureToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization === undefined) {
    res.status(403).send("not allowed");
  } else {
    req.token = authorization;
    next();
  }
};

router.post("/", ensureToken, async (req, res) => {
  const {
    id,
    title,
    date,
    collecting_institution,
    image,
    creator,
    dimensions,
    medio,
    price,
  } = req.body;
  jwt.verify(req.token, "secret_token", (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      if (data.role === true) {
        const postArtwork = createArtwork(
          id,
          title,
          date,
          collecting_institution,
          image,
          creator,
          dimensions,
          medio,
          price
        );
        res.status(200).send("Artwork created succesfully");
      } else {
        res.status(403).send("You cannot create an artwork");
      }
    }
  });
});

router.put("/:idArtwork", async (req, res) => {
  const { idArtwork } = req.params;
  const {
    title,
    date,
    collecting_institution,
    image,
    creator,
    dimensions,
    medio,
    price,
  } = req.body;
  try {
    await Artwork.update(
      {
        title,
        date,
        collecting_institution,
        image,
        creator,
        dimensions,
        medio,
        price,
      },
      {
        where: { id: idArtwork },
      }
    );
    res.status(200).send("se actualizo con exito la obra de arte");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/delete/:idArtwork", async (req, res) => {
  const { idArtwork } = req.params;
  const artwork = Artwork.findByPk(idArtwork);
  try {
    if (artwork.show) {
      await Artwork.update(
        { show: false },
        {
          where: { id: idArtwork },
        }
      );
      res.send("eliminado con exito");
    } else {
      await Artwork.update(
        { show: true },
        {
          where: { id: idArtwork },
        }
      );
      res.send("reestablecido con exito");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
