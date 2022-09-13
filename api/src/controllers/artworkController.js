const axios = require("axios");

const getArtworks = async() => {
  try {
      var art = []
      var url = "https://stagingapi.artsy.net/api/artworks"
      for (let i = 1; i < 8; i++) {
      
      const apiData = await axios(url, {
          headers: {
            "X-Xapp-Token":
              "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI2MzFmNGUxZmQ0OGE0MzAwMGI5ODg2NGUiLCJleHAiOjE2NjM2MDA3OTksImlhdCI6MTY2Mjk5NTk5OSwiYXVkIjoiNjMxZjRlMWZkNDhhNDMwMDBiOTg4NjRlIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjYzMWY0ZTFmMmZhYzgzMDAwYzVjNjAwZCJ9.MV-g3QRZf8b0AI2pBE8aXhWzyJbmoTLyWbOrzrbrzxs",
          },
        })
        let apiArt = await apiData.data
        apiArt._embedded.artworks.map( async(r)=>{ 
          let artist = await axios.get(r._links.artists.href,{
            headers: {
              "X-Xapp-Token":
                "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI2MzFmNGUxZmQ0OGE0MzAwMGI5ODg2NGUiLCJleHAiOjE2NjM2MDA3OTksImlhdCI6MTY2Mjk5NTk5OSwiYXVkIjoiNjMxZjRlMWZkNDhhNDMwMDBiOTg4NjRlIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjYzMWY0ZTFmMmZhYzgzMDAwYzVjNjAwZCJ9.MV-g3QRZf8b0AI2pBE8aXhWzyJbmoTLyWbOrzrbrzxs",
            },
          })
          // console.log(artist)
          let artistName = await artist.data._embedded.artists[0]?.name
          // console.log(artistName)
          art.push({
            id:r.id,
            title:r.title,
            date: r.date,
            collecting_institution: r.collecting_institution ? r.collecting_institution : false,
            image: r._links.thumbnail.href,
            artists: artistName ? artistName : 'unknown'
          })
        })
        url = apiArt._links.next.href
      }
      return art
  } catch (error) {
    console.log(error);
  }
};



module.exports = getArtworks;
