const request =require('request')

const weather =({lat,long},callback)=>{

    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=954fc31e1c78eb0a09dfac5278e6dd8a&units=metric`
    request(
        {url,json:true} , (err , res)=>{
            if(err){
                return callback("unable to connect your server");
            }
            if(res.body.cod === "400"){
                return callback(res.body.message);
            }
            callback(undefined , res.body);
    })
}

module.exports = weather

