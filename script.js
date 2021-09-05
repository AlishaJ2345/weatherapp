let loc = document.getElementById("location");
let tempIcon = document.getElementById("temp-icon");
let tempValue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconFile;
window.addEventListener("load", ()=> {
    let long;
    let lat;

    if(navigator.geolocation) //ask for permission for current location
    {
        navigator.geolocation.getCurrentPosition((position) => {
            long= position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
           // const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0eb61a73a0c4fdcd39d7f4bb1c725fb3`;
           const api = `${proxy}api.openweathermap.org/data/2.5/weather?q=London&appid=0eb61a73a0c4fdcd39d7f4bb1c725fb3`
           
            fetch(api)
            .then((response) => {
             return response.json();
            })
            .then(data => {
                const {name} = data;
                const {feels_like} = data.main;
                const {id, main} = data.weather[0];
                loc.textContent = name;
                climate.textContent = main;
                tempValue.textContent = Math.round(feels_like-273);
                if (id < 250)
                {
                    tempIcon.src = './icons/storm.png'
                }
                else if (id < 350)
                {
                    tempIcon.src = './icons/drizzle.jpg'
                }
                else if (id < 550)
                {
                    tempIcon.src = './icons/rain.png'
                }
                else if (id < 650)
                {
                    tempIcon.src = './icons/snow.png'
                }
                else if (id < 800)
                {
                    tempIcon.src = './icons/sunny.png'
                }
                else if (id === 800)
                {
                    tempIcon.src = './icons/clear.jpg'
                }
                else if (id > 800)
                {
                    // tempIcon.src = './icons/clouds.jpg'
                }
                console.log(data);
               })
        })
    }
})