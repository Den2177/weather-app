const API_KEY = '2eec38b1d1c8bf2d1202929642f75b4e';

export const getCords = async (cityName, countryCode) => {
    return fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&appid=${API_KEY}`)
        .then(res => res.json());
}

export const getWeatherInfos = async ({lat, lon}) => {
    return fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        .then(res => res.json());
}