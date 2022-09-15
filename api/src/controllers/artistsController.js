const axios = require("axios");
// const db = require("../db");
// const Artist = require("../models/Artist");
const data = require("../dbArtists.json");
require("dotenv").config();
const { API_KEY } = process.env;

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
    return data;
  } catch (error) {
    console.log(error);
  }
};

// getArtists()

// const getArtistInDb = async () =>{
//   const artists = await getArtists()
//   // console.log(artists)
//   let db = artists.map(a=>{
//     return {
//       name:a.name
//     }
//   })
//   console.log(db)
//   db.forEach(g=>{
//     Artist.findOrCreate({
//       where:{name:g.name}
//     })
//   })
// }

// getArtistInDb()

module.exports = getArtists;
