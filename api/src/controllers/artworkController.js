const axios = require("axios");
const { Artwork } = require("../db");
require("dotenv").config();
const { API_KEY } = process.env;
const data = require("../dbArtworks.json");

// const getApiArtworks = async () => {
//   var art = [];
//   var url = "https://stagingapi.artsy.net/api/artworks";
//   for (let i = 1; i < 10; i++) {
//     const apiData = await axios(url, {
//       headers: {
//         "X-Xapp-Token": `${API_KEY}`,
//       },
//     });
//     let apiArt = await apiData.data;
//     apiArt._embedded.artworks.map(async (r) => {
//       var artist = await axios.get(r._links.artists.href, {
//         headers: {
//           "X-Xapp-Token": `${API_KEY}`,
//         },
//       });

//       let artistName = await artist.data._embedded.artists[0]?.name;
//       art.push({
//         id: r.id,
//         title: r.title,
//         date: r.date,
//         collecting_institution: r.collecting_institution
//           ? r.collecting_institution
//           : false,
//         image: r._links.thumbnail.href,
//         artist: artistName ? artistName : "unknown",
//         medio: r.medium,
//         dimensions: r.dimensions.cm.text,
//         price: `${Math.floor(r.iconicity)}0`,
//       });
//     });
//     url = apiArt._links.next.href;
//   }
//   return art;
// };

const getDbArtworks = async () => {
  const getDb = data.map((el) => {
    const {
      id,
      title,
      date,
      collecting_institution,
      image,
      artist,
      medio,
      dimensions,
      price,
    } = el;
    Artwork.findOrCreate({
      where: {
        title: title,
      },
      defaults: {
        
        date: date,
        collecting_institution: collecting_institution
          ? collecting_institution
          : "false",
        image: image,
        show: true,
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
