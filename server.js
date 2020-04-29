const axios = require("axios")
const qs = require("qs")

const http = require('http')

const hostname = '127.0.0.1'
const port = 8000

const spotifyBaseURL = 'https://api.spotify.com/v1';

var client_id = '7764d7c9edba45e298c517cad32a8f9a'; // Your client id
var client_secret = 'c357eb597b8e48eea7e95f9dd1e0a2b3'; // Your secret


const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  getSpotifyDataAxios()
  .then((apiResp) =>{
      console.log(apiResp)
    res.write(JSON.stringify(apiResp.data))
    res.end()
  })
  .catch((error)=>{
    res.write(qs.stringify(error))
    res.end()
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})

async function getSpotifyDataAxios(){
    let grant = {
        grant_type: 'client_credentials'
    }

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: "POST",
        data:qs.stringify(grant),
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        }
      };

      let token = await axios(authOptions)
      .catch((error)=>{
        console.log(error)
        return "post error";
      });
      console.log(token)

      let url = `${spotifyBaseURL}/artists/3MZsBdqDrRTJihTHQrO6Dq`
        let requestOptions = {
            url:url,
            headers: { 'Authorization': 'Bearer ' + token.data.access_token },
            json:true 
        }

        let data = await axios(requestOptions)
        .catch((error)=>{
            return "get error";
        })
        return data;
}