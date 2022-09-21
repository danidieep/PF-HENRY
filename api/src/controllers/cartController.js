const { Cart, ArtworkInCart, User, Artwork } = require("../db");

const getCart = async(cartId)=>{
    return await Cart.findOne({
        where:{
            id:cartId
        },
        include: ArtworkInCart
    })
}

const addArtworkInCart = async (artworkId)=>{
    return await ArtworkInCart.create({artworkId})
}

const deleteArtworkInCart = async(artworkInCartID)=>{
    return await ArtworkInCart.destroy({
        where:{
            id:artworkInCartID
        }
    })
}

const updateCart = async(totalPrice, cartId) =>{
    return await Cart.update({
        totalPrice,
    },
    {where:
        {
        id:cartId,
    }
  })
}

// const updateArtworkInCart = async(ArtworkInCart, cart, artworkId, artworkRemoved, added)=>{
//     if(artworkRemoved || artworkRemoved==='all'){
//         totalPrice=0
//         if(artworkId){
//             let artwork = await Artwork.findByPk(artworkId)
//             if(!artworkRemoved){

//             }
//         }
//     }
// }

module.exports={getCart, addArtworkInCart, deleteArtworkInCart, updateCart }