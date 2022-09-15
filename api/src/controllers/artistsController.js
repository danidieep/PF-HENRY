const axios = require("axios");
// const db = require("../db");
// const Artist = require("../models/Artist");
require("dotenv").config();
const { API_KEY } = process.env;

const getArtists = async () => {
  try {
    var artist = [];
    var url = "https://stagingapi.artsy.net/api/artworks";
    for (let i = 1; i <= 10; i++) {
      const apiData = await axios(url, {
        headers: {
          "X-Xapp-Token": `${API_KEY}`,
        },
      });
      let apiArtworks = await apiData.data;
      apiArtworks._embedded.artworks.map(async (r) => {
        let artistsApiArtworks = await axios.get(r._links.artists.href, {
          headers: {
            "X-Xapp-Token": `${API_KEY}`,
          },
        });
        if (artistsApiArtworks.data._embedded.artists[0]?.id) {
          artist.push({
            id: artistsApiArtworks.data._embedded.artists[0]?.id,
            name: artistsApiArtworks.data._embedded.artists[0]?.name,
          });
        }
      });
      url = apiArtworks._links.next.href;
    }
    return artist;
  } catch (error) {
    console.log(error);
  }
};

  module.exports= getArtists 
