const { Router } = require("express");
const getArtists = require("../controllers/artistsController");
const router = Router();

router.get('/', async (req, res, next) =>{
    const {name} = req.query
    if(name){
    try {
        const artists = await getArtists()
        const artist = artists.filter((e)=> e.name.toUpperCase().includes(name.toUpperCase()))
       if(artist.length){
           res.send(artist)
        }else{
            res.status(404).send('Artist does not found')
        }
        }catch(error){
            console.log(error)
        }
    }
        try {
            const allArtists = await getArtists()
            res.status(200).send(allArtists)
        }catch (error) {
        console.log(error)
    }
})

router.get("/:idArtist", async (req, res) => {
    try {
      const { idArtist } = req.params;
      const getArtist = await getArtists();
      const artistById = getArtist.filter((e) => e.id === idArtist);
      if (artistById.length === 0) res.status(400).send("Artist does not found");
      else res.status(200).send(artistById);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = router