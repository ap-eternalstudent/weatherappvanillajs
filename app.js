window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription  = document.querySelector('.temperature-description');
    let temperatureDegree       = document.querySelector('.temperature-degree');
    let locationTimeZone        = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.degree-section span');
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long            = position.coords.longitude;
            lat             = position.coords.latitude;
            const proxy     = 'http://cors-anywhere.herokuapp.com/'
            const api       = `${proxy}https://api.darksky.net/forecast/3430adfbd5d74973b4b084fbb283d1a2/${lat},${long}`;
            fetch(api)
                .then(response => {
                return response.json(); 
                })
                .then(data => {
                    // temperature  = temperature at location
                    // summary      = weather condition at location
                    const { temperature, summary, icon } = data.currently;
                    // Set DOM Elements from the API
                    temperatureDegree.textContent       = Math.floor(temperature);
                    temperatureDescription.textContent  = summary; 
                    locationTimeZone.textContent        = data.timezone;
                    // Celsius to Fehrenheit conversion
                    let celsius = (temperature - 32) * (5 / 9);
                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    // Toggle Fahrenheit / Celsius
                    temperatureSection.addEventListener('click', () =>{
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                             temperatureSpan.textContent = "F";
                             temperatureDegree.textContent = Math.floor(temperature);
                        }
                    } )
                });
            });
    }
    function setIcons(icon, iconID) {
        const skycons       = new Skycons({color: "white"});
        const currentIcon   = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
        }
});
