import './style.css';
import { getData } from './getData';
import Icon from "./icon/search.svg";

const searchButton = document.querySelector("#searchButton");
const searchIcon = new Image();
searchIcon.src = Icon;
searchIcon.alt = "search icon";
searchButton.appendChild(searchIcon);

let tempElement = document.querySelector("#temp");
let tempMinElement = document.querySelector("#tempMin");
let tempMaxElement = document.querySelector("#tempMax");

async function loadData(location) {
    const data = await getData(location);
    if (data) {
        document.querySelector("#location").textContent = data.resolvedLocation();
        document.querySelector("#condition").textContent = data.condition(0);
        document.querySelector("#temp").textContent = data.temp() + " °F";
        document.querySelector("#tempMin").textContent = data.tempMin() + " °F";
        document.querySelector("#tempMax").textContent = data.tempMax() + " °F";
        document.querySelector("#day").textContent = data.day();
    } else {
        console.error('Failed to load weather data.');
    }
}

const search = document.querySelector('#searchButton');
search.addEventListener('click', () => {
    const location = document.querySelector("#city").value;
    loadData(location);
});

const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');

celsius.addEventListener('click', () => {
    const tempElements = document.querySelectorAll('#temp, #tempMin, #tempMax');
    tempElements.forEach(tempElement => {
        if (tempElement.className === "metric") {
            const tempValue = parseFloat(tempElement.textContent);
            const celsiusValue = Math.round(((tempValue - 32) * (5 / 9)) * 10) / 10;
            tempElement.textContent = `${celsiusValue} °C`;
            tempElement.className = "imperial";
        }
    });
    celsius.style.backgroundColor = "lightBlue";
    fahrenheit.style.backgroundColor = "white";
});

fahrenheit.addEventListener('click', () => {
    const tempElements = document.querySelectorAll('#temp, #tempMin, #tempMax');
    tempElements.forEach(tempElement => {
        if (tempElement.className === "imperial") {
            const tempValue = parseFloat(tempElement.textContent);
            const fahrenheitValue = Math.round(((tempValue * (9 / 5)) + 32) * 10) / 10;
            tempElement.textContent = `${fahrenheitValue} °F`;
            tempElement.className = "metric";
        }
    });
    celsius.style.backgroundColor = "white";
    fahrenheit.style.backgroundColor = "lightBlue";
});