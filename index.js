var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add')
var city = document.querySelector('#cityoutput')
var description = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')

var api_key = "291abc5a79faf1545fa43a5ffb621e97"

function convert(val){
    return (val-273).toFixed(3)
}

btn.addEventListener('click', function(){
    var lat=''
    var long=''
    fetch('http://api.openweathermap.org/geo/1.0/direct?q='+inputval.value+'&appid='+api_key)
    .then(res => res.json())
    .then(data=>{
        lat = data['lat']
        long = data['lon']
    })

    fetch('https://api.openweathermap.org/data/3.0/onecall?lat='+long+'&lon='+lat+'&appid='+api_key)
    .then(res => res.json())
    .then(data => 
        {
            var name = data['name']
            var descr = data['weather']['0']['description']
            var temparature = data['main']['temp']
            var windspeed = data['wind']['speed']

            city.innerHTML = `Weather of <span>${name}<span>`
            temp.innerHTML = `Temperature: <span>${convert(temparature)} C</span>`
            description.innerHTML = `Sky Conditions: <span>${descr}</span>`
            wind.innerHTML = `Wind Speed: <span>${windspeed}</span>`
        })

        .catch(err => alert('Wrong City Name'))
})