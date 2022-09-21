
const axios = require("axios");
// const db = require("../db");
// const Artist = require("../models/Artist");

const { Artist } = require("../db");
const data = require("../dbArtists.json");

require("dotenv").config();

const getArtists = async () => {
  try {
    // var url = "https://stagingapi.artsy.net/api/artworks";
    // for (let i = 1; i <= 10; i++) {
    //   const apiData = await axios(url, {
    //     headers: {
    //       "X-Xapp-Token": `${API_KEY}`,
    //     },
    //   });
    // let apiArtworks = await apiData.data;
    // apiArtworks._embedded.artworks.map(async (r) => {
    //   let artistsApiArtworks = await axios.get(r._links.artists.href, {
    //     headers: {
    //       "X-Xapp-Token": `${API_KEY}`,
    //     },
    //   });
    //   if (artistsApiArtworks.data._embedded.artists[0]?.id) {
    //     artist.push({
    //       id: artistsApiArtworks.data._embedded.artists[0]?.id,
    //       name: artistsApiArtworks.data._embedded.artists[0]?.name,
    //       birthday: artistsApiArtworks.data._embedded.artists[0]?.birthday,
    //       hometown: artistsApiArtworks.data._embedded.artists[0]?.hometown,
    //     });
    //   }
    // });
    // url = apiArtworks._links.next.href;
    // }
    const getDb = data.map((el) => {
      const { id, name, birthday, hometown } = el;
      Artist.findOrCreate({
        where: {
          id: id,
          name: name,
          birthday: birthday,
          hometown: hometown,
        },
      });
    });
    const artistsDb = await Artist.findAll();
    return artistsDb;
  } catch (error) {
    console.log(error);
  }
};
module.exports = getArtists;
