const { Favourite, Artworks, User } = require("../db");

const getFavs = async (userId) => {
  let favourites =await User.findOne({
    where:{
        id:userId
    },
    include:[{model:Favourite , include:Artworks}]
});

return favourites ? favourites.dataValues.Favorites:[]
};

module.exports = getFavs;