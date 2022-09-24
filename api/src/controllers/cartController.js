const { Cart, Artworkincart, User, Artwork } = require("../db");

const getCart = async(cartId)=>{
    return await Cart.findOne({
        where:{
            id:cartId
        },
        include: Artworkincart
    })
}

const addArtworkInCart = async (artworkId)=>{
    return await Artworkincart.create({artworkId})
}

const deleteArtworkInCart = async(artworkInCartID)=>{
    return await Artworkincart.destroy({
        where:{
            id:artworkInCartID
        }
    })
}

const updateCart = async(totalPrice, cartId) =>{
    return await Cart.update(
    {
    totalPrice,
    },
    {
    where:{
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

const resetUserCart= async (userId)=>
{    
    try {
        let newCartId=await Cart.create().then(r=>r.dataValues.id);
        let user=await User.findByPk(userId);
        await Cart.destroy({
            where:{
                id:user.cartId
            }
        })
        await User.update(
            {
            cartId:newCartId,
            },
            {
            where: {
                id: userId,
            },
            }
        );
        return {status:"Cart reseted"}
    } catch (error) {
        console.log(error.message)
        return {status:"Error updating user cart"}
    }
}

module.exports={getCart, addArtworkInCart, deleteArtworkInCart, updateCart, resetUserCart }