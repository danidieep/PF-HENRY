const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;

const getArtworks = async () => {
  try {
    var art = [];
    var url = "https://stagingapi.artsy.net/api/artworks";
    for (let i = 1; i <= 10; i++) {
      const apiData = await axios(url, {
        headers: {
          "X-Xapp-Token": `${API_KEY}`,
        },
      });
      let apiArt = await apiData.data;
      apiArt._embedded.artworks.map(async (r) => {
        var artist = await axios.get(r._links.artists.href, {
          headers: {
            "X-Xapp-Token": `${API_KEY}`,
          },
        });
        
        let artistName = await artist.data._embedded.artists[0]?.name;
        art.push({
          id: r.id,
          title: r.title,
          date: r.date,
          collecting_institution: r.collecting_institution
            ? r.collecting_institution
            : false,
          image: r._links.thumbnail.href,
          artist: artistName ? artistName : "unknown",
          medio: r.medium,
          dimensions: r.dimensions.cm.text,
          price: `${Math.floor(r.iconicity)}0`,
        });
      });
      url = apiArt._links.next.href;
    }
    return art;
  } catch (error) {
    console.log(error);
  }
};



module.exports = getArtworks;
