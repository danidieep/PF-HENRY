const { Router } = require("express");
const getArtists = require("../controllers/artistsController");
const createArtist = require("../controllers/artistsPostController");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    const artists1 = await getArtists();
    // const artsName = artists1.map((e) => JSON.stringify(e));
    // const artists = [...new Set(artsName)];
    // let arr = [];
    // artists.map((e) =>
    //   arr.push({ id: e.slice(9, 31), name: e.slice(41, e.length - 2) })
    // );
    if (name) {
      const artist = artists1.filter((e) =>
        e.name.toUpperCase().includes(name.toUpperCase())
      );
      if (artist.length) res.send(artist);
      else res.status(400).json({ message: "Artist does not found" });
    }
    res.status(200).send(artists1);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:idArtist", async (req, res) => {
  try {
    const { idArtist } = req.params;
    const getArtist = await getArtists();
    // const artsName = getArtist.map((e) => JSON.stringify(e));
    // const artists = [...new Set(artsName)];
    const artistById = getArtist.filter((e) => e.id.includes(idArtist));
    // let arr = [];
    // artistById.map((e) =>
    //   arr.push({ id: e.slice(9, 31), name: e.slice(41, e.length - 2) })
    // );
    if (artistById.length === 0)
      res.status(400).json({ message: "Artist does not found" });
    else res.status(200).send(artistById);
  } catch (error) {
    console.log(error);
  }
});


router.post("/", async (req, res) => {
  try {
    const { id, name, birthday, hometown } = req.body;
    createArtist(id, name, birthday, hometown);
  } catch (error) {
    res.send(400).send(error);
  }
});


module.exports = router;
