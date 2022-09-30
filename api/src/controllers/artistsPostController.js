const { Artist } = require("../db");

const createArtist = async (data) => {
  try {
    const { id, name, birthday, hometown } = data.payload
    const artistCreate = await Artist.findOrCreate({
      where: {
        name
      },
      defaults: {
        id,
        birthday,
        hometown
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = createArtist;

