import './style.css';
import { getData } from './getData';
import Icon from "./icon/search.svg";


const searchButton = document.querySelector("#searchButton");
const searchIcon = new Image();
searchIcon.src = Icon;
searchIcon.alt = "search icon";
searchButton.appendChild(searchIcon);

async function loadData(location) {
    const data = await getData(location);
    if (data) {
        document.querySelector("#icon").src = data.icon();
        document.querySelector("#location").textContent = data.resolvedLocation();
        document.querySelector("#condition").textContent = data.condition(0);
        document.querySelector("#temp").textContent = data.temp() + "°";
        document.querySelector("#tempMin").textContent = "L: " + data.tempMin() + "°";
        document.querySelector("#tempMax").textContent = "H: " + data.tempMax() + "°";
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
            // Extract the numeric value from the text content
            const tempValue = parseFloat(tempElement.textContent.replace(/[^0-9.-]+/g,""));
            const celsiusValue = Math.round(((tempValue - 32) * (5 / 9)) * 10) / 10;

            // Preserve the "H:" and "L:" labels if they exist
            let label = tempElement.textContent.includes("H:") ? "H: " : tempElement.textContent.includes("L:") ? "L: " : "";
            tempElement.textContent = `${label}${celsiusValue}°`;
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
            // Extract the numeric value from the text content
            const tempValue = parseFloat(tempElement.textContent.replace(/[^0-9.-]+/g,""));
            const fahrenheitValue = Math.round(((tempValue * (9 / 5)) + 32) * 10) / 10;

            // Preserve the "H:" and "L:" labels if they exist
            let label = tempElement.textContent.includes("H:") ? "H: " : tempElement.textContent.includes("L:") ? "L: " : "";
            tempElement.textContent = `${label}${fahrenheitValue}°`;
            tempElement.className = "metric";
        }
    });
    celsius.style.backgroundColor = "white";
    fahrenheit.style.backgroundColor = "lightBlue";
});