export const getLat = () => {
    return JSON.parse(localStorage.getItem('cords'))?.lat || null;
}

export const getLon = () => {
    return JSON.parse(localStorage.getItem('cords'))?.lon || null;
}

export const saveCords = (cords) => {
    localStorage.setItem('cords', JSON.stringify(cords));

    return true;
}

export const saveCityName = (name) => {
    localStorage.setItem('city-name', name);

    return true;
}

export const getCityName = () => {
    return localStorage.getItem('city-name');
}