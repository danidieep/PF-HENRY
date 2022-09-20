const { Favourite } = require("../db");

const getFavs = async () => {
  try {
    const getFavourites = await Favourite.findAll();
    return getFavourites;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getFavs;