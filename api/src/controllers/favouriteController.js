const { Favourite, Artworks, User, Artworkinfav} = require("../db");


const getFav = async(favId)=>{
    return await Favourite.findOne({
        where:{
            id:favId
        },
        include: Artworkinfav
    })
}

const addArtworkInFav = async (artworkId)=>{
    return await Artworkinfav.create({artworkId})
}

const deleteArtworkInFav = async(artworkInFavId)=>{
    return await Artworkinfav.destroy({
        where:{
            id:artworkInFavId
        }
    })
}


const resetUserFav = async (userId)=>
{    
    try {
        let newFavId=await Favourite.create().then(r=>r.dataValues.id);
        let user=await User.findByPk(userId);
        await Favourite.destroy({
            where:{
                id:user.favId
            }
        })
        await User.update(
            {
            favId:newFavId,
            },
            {
            where: {
                id: userId,
            },
            }
        );
        return {status:"fav reseted"}
    } catch (error) {
        console.log(error.message)
        return {status:"Error updating user fav"}
    }
}

module.exports={getFav, addArtworkInFav, deleteArtworkInFav, resetUserFav }