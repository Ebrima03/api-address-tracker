 const src = document.querySelector('#search');
const btn = document.querySelector('#button');

// Initialize map
var map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Marker placeholder
var marker = L.marker([20, 0]).addTo(map);

// UI fields
const ipField = document.querySelector('#ip');
const locationField = document.querySelector('#location');
const timezoneField = document.querySelector('#timezone');
const ispField = document.querySelector('#isp');


// Fetch IP info function
async function fetchIpInfo(ip) {
    try {
        const res = await fetch(`https://ipapi.co/${ip}/json/`);
        const data = await res.json();
console.log(data)
        if (data.error) {
            alert("Invalid IP Address");
            return;
        }

        // Update map position
        const lat = data.latitude;
        const lon = data.longitude;

        map.setView([lat, lon], 13);
        marker.setLatLng([lat, lon]);

        // Update UI
        document.getElementById("ipAddress").textContent = data.ip;
        document.getElementById("locationValue").textContent = `${data.city}, ${data.region}`;
        document.getElementById("timezoneValue").textContent = data.timezone;
        document.getElementById("ispValue").textContent = data.org;

    } catch (err) {
        console.log(err)
        alert("Could not fetch IP information");
    }
}


// Button click
btn.addEventListener("click", () => {
    const ip = src.value.trim();
    if (!ip) return alert("Enter an IP address!");

    fetchIpInfo(ip);
});

// Enter key support
src.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        btn.click();
    }
});

//  var map = L.map('map').setView([51.505, -0.09], 13);
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

// var marker = L.marker([51.5, -0.09]).addTo(map);

// var circle = L.circle([51.508, -0.11], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map);

// var polygon = L.polygon([
//     [51.509, -0.08],
//     [51.503, -0.06],
//     [51.51, -0.047]
// ]).addTo(map);

// marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
// circle.bindPopup("I am a circle.");
// polygon.bindPopup("I am a polygon.");

// function onMapClick(e) {
//     alert("You clicked the map at " + e.latlng);
// }

// map.on('click', onMapClick);

// var popup = L.popup();

// function onMapClick(e) {
//     popup
//         .setLatLng(e.latlng)
//         .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(map);
// }

// map.on('click', onMapClick);
