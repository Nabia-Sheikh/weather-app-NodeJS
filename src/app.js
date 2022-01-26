const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const PORT = process.env.PORT || 8080

const app = express()
app.set("view engine", "hbs")

const public =path.join(__dirname,"../public")
const tempviews =path.join(__dirname,"../templates/views")
const partials =path.join(__dirname,"../templates/partials")

app.use(express.static(public))
app.set("views", tempviews)
hbs.registerPartials(partials)

app.get("/",(req,res)=>{
    res.render("weather",{message:"good night"})
})

app.get("/api/weather",(req,res)=>{
    const city = req.query.address
    console.log(city);
    if(!city){
        return res.json("Please provide city name!")
    }
    geocode(city, (err, geoRes) => {
        if (err) {
            return res.json(err);
        }
        const lat = geoRes.lat
        const long = geoRes.long
        weather({lat,long},(err,weatherRes)=>{
            if(err){
                return res.json(err);
            }
            const location = geoRes.location
            res.json({weatherRes,location});
        })
    })
    
})




app.listen(PORT , ()=>console.log(`Server is running on ${PORT}`))



