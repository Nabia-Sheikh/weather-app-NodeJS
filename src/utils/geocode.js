const request = require('request')

const geocode = (address , callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic2hhaGJhYXpreXoiLCJhIjoiY2t4azAwcGN4NmtpcTJ0bGFwNHF4NHJieSJ9.hMVArNfg4zhXDJMhwIJesQ"

    request(
        {url,json:true},(err,res)=>{
            if(err){
                return callback(err);
            }
            const long = res.body.features[0].geometry.coordinates[0]
            const lat = res.body.features[0].geometry.coordinates[1]
            const location = res.body.features[0].place_name
            callback(undefined,{long,lat,location})
        }
    )
}

module.exports = geocode















