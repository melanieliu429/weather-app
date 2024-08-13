import clearDay from './icon/clear-day.svg';
import clearNight from './icon/clear-night.svg';
import cloudy from './icon/cloudy.svg';
import foggy from './icon/foggy.svg';
import partlyCloudyDay from './icon/partly-cloudy-day.svg';
import partlyCloudyNight from './icon/partly-cloudy-night.svg';
import rainy from './icon/rainy.svg';
import snowy from './icon/snowy.svg';
import sunny from './icon/sunny.svg';
import windy from './icon/windy.svg';

async function getData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=FPJQGAQ7L3H2B3KQXACV5SLKN`, {
            mode: 'cors'
        });
        const data = await response.json();

        const getIcon = function getCorrespondingWeatherIcon(weather) {
            switch (weather) {
                case 'clear-day':
                    return clearDay;
                case 'clear-night':
                    return clearNight;
                case 'cloudy':
                    return cloudy;
                case 'fog':
                    return foggy;
                case 'partly-cloudy-day':
                    return partlyCloudyDay;
                case 'partly-cloudy-night':
                    return partlyCloudyNight;
                case 'rain':
                    return rainy;
                case 'snow':
                    return snowy;
                case 'sunny':
                    return sunny;
                case 'wind':
                    return windy;
                default:
                    return null;
            }
        };

        // Get the current weather icon string and find the corresponding image
        const weatherIcon = getIcon(data.currentConditions.icon);

        const day = () => data.days[0].datetime;
        const condition = (index) => data.days[index].conditions;
        const temp = () => data.currentConditions.temp;
        const tempMin = () => data.days[0].tempmin;
        const tempMax = () => data.days[0].tempmax;
        const resolvedLocation = () => data.resolvedAddress;

        return {
            day,
            condition,
            temp,
            tempMin,
            tempMax,
            resolvedLocation,
            icon: () => weatherIcon, // Use the correct icon path
        };
    } catch (error) {
        console.error("bad location", error);
        return null;
    }
}

export { getData };