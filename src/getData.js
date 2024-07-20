async function getData(location) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=FPJQGAQ7L3H2B3KQXACV5SLKN`, {
            mode: 'cors'
        });
        const data = await response.json();

        const day = () => data.days[0].datetime;
        const condition = (index) => data.days[index].conditions;
        const temp = () => data.currentConditions.temp;
        const tempMin = () => data.days[0].tempmin;
        const tempMax = () => data.days[0].tempmax;
        const resolvedLocation = () => data.resolvedAddress;
        const icon = () => data.currentConditions.icon;

        return {
            day,
            condition,
            temp,
            tempMin,
            tempMax,
            resolvedLocation,
            icon,
        }
    } catch (error) {
        console.error("bad location", error);
        return null;
    }
}

export { getData };