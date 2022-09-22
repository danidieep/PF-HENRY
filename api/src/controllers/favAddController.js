const { Router } = require("express");
const {Artwork, Users, Favourite } = require("../db");
const router = Router()

router.post('/favourite', async (req, res) =>{
    let {id} = req.params
    const getArtwork = await getArtworks();
    const artworkById = getArtwork.filter((e) => e.id === id);
    try {
        let addFavourite = await Favourite.findOrCreate({
            where:{id: artworkById.id}
        })
        let userId = await Users.findOne({
            where:{id: user.id}
        })
        addFavourite.setUsers(userId)
        res.send('agregado con exito')
    } catch (error) {
        console.log(error)
    }
})