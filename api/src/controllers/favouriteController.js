const { Favourite, Artworks, User } = require("../db");

const getFavs = async (email) => {
  let favourites =await User.findOne({
    where:{
        email
    },
    include:[{model:Favourite , include:Artworks}]
});

return favourites ? favourites.dataValues.Favorites:[]
};

module.exports = getFavs;