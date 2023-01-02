export async function httpGetLocation(lat, long) {
    const token = process.env.REACT_APP_PK_LOCATION_TOKEN;
    const response = await fetch(`https://us1.locationiq.com/v1/reverse?key=${token}&lat=${lat}&lon=${long}&format=json`);
    return await response.json();
}

