// Initializing map and map details
var map = L.map('map', { zoomControl: false }).setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Initializing markerIcon and places it on map
var markerIcon = L.icon({
    iconUrl: './images/icon-location.svg'
});

var marker = L.marker([51.505, -0.09], { icon: markerIcon }).addTo(map);

// Get user's ip and displays info and places location on map
// when the page loads
window.onload = function () {
    getIPData();
};

// Uses Ipify's API to get information on IP address user inputted
const getIPData = async () => {
    let ip_address = document.getElementById('user-input').value;
    const url = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_glAqMkmvdv3ZpjdLrppGgWDTn62mi&ipAddress=' + ip_address;

    const response = await fetch(url);
    const data = await response.json();

    // Update map and marker location
    map.setView([data.location.lat, data.location.lng], 13);
    marker.setLatLng([data.location.lat, data.location.lng])

    // Update ip address information in the page
    document.getElementById('ip-address').innerText = data.ip;
    document.getElementById('location').innerText = data.location.city + ", " + data.location.region + " " + data.location.postalCode;
    document.getElementById('timezone').innerText = 'UTC ' + data.location.timezone;
    document.getElementById('isp').innerText = data.isp;
}

const search = (event) => {
    if (event.key == 'Enter') {
        getIPData();
    }
}
