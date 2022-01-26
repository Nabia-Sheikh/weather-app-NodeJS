const inp = document.querySelector('input')
const form = document.querySelector('form')
const button = document.querySelector('button')
const error = document.querySelector('#error')
const reportDiv = document.querySelector(".report");
const city = document.querySelector(".city");
const dated = document.querySelector(".date");
const description = document.querySelector(".description");
const tempFont = document.querySelector(".tempFont");
const minTemp = document.querySelector(".minTemp");
const maxTemp = document.querySelector(".maxTemp");
const feelsLike = document.querySelector(".feelsLike");
const humidity = document.querySelector(".humidity");

//* Date

let date = new Date();
let currDate = date.getDate();
let currMonth = date.toLocaleString("en-us", { month: "long" });
let year = date.getFullYear();

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const val = inp.value

    fetch(`/api/weather?address=${val}`).then
    (res=>res.json().then(data=>{
        if(!val){
            error.style.display ="block"
          return  error.textContent = data
        }
        if(data.err){
            error.style.display ="block"
          return  error.textContent = data.err
        }
        error.style.display = "none";
        reportDiv.style.display = "block";
        inp.value = ""
        description.textContent = (data.weatherRes.weather[0].description).toUpperCase();
        city.textContent = (data.weatherRes.name)
        dated.textContent = currMonth + " " + currDate + " , " + year
        const icon = (data.weatherRes.weather[0].icon);
        
        (document.getElementById(
            "image"
          ).src = `https://openweathermap.org/img/wn/${icon}@2x.png`);
        
          tempFont.textContent = (data.weatherRes.main.temp + "°")
          maxTemp.textContent = data.weatherRes.main.temp_max + "/" + data.weatherRes.main.temp_min + "°"
          feelsLike.textContent ="Feels Like: "+data.weatherRes.main.feels_like
          humidity.textContent ="Humidity: "+data.weatherRes.main.humidity
        console.log(data);
    }))
})
