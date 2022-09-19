const axios = require("axios");
const { Artwork } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const data = require("../dbArtworks.json");



const getDbArtworks = async () => {
  const getDb = data.map( async (el) => {
    const {
      
      title,
      date,
      collecting_institution,
      image,
      artist,
      medio,
      price,
      dimensions,
      iconicity,
    } = el;
     await Artwork.findOrCreate({
      where: {
        title: title,
      },
      defaults: {
        
        date: date,
        collecting_institution: collecting_institution
          ? collecting_institution
          : "false",
        image: image,
        creator: artist ? artist : "unknown",
        medio: medio,
        dimensions: dimensions,
        price: price ? price : "null",
      },
    });
  });
  const getArtworkDb = await Artwork.findAll();
  return getArtworkDb;
};

const getArtworks = async () => {
  try {
    // const apiInfo = await getApiArtworks();
    const dbInfo = await getDbArtworks();
    // const infoTotal = apiInfo.concat(dbInfo);
    return dbInfo;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getArtworks;
