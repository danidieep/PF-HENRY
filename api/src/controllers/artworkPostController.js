const { Op } = require("sequelize");
const { Artist, Artwork } = require("../db");

const createArtwork = async (
  id,
  title,
  date,
  collecting_institution,
  image,
  creator,
  dimensions,
  medio,
  price
) => {
  const artworkCreate = await Artwork.create({
    id,
    title,
    date,
    collecting_institution,
    creator,
    dimensions,
    image,
    medio,
    price,
  });
  const findArtist = await Artist.findOne({
    where: {
      name: {
        [Op.eq]: creator,
      },
    },
  });
  artworkCreate.setArtist(findArtist);
};

module.exports = createArtwork;
