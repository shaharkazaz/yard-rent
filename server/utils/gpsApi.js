const querystring = require('querystring');
const http = require("http");
const configBing = require('../utils/configBing');


async function getCoordinatesByAddress(street, city, country){
    return new Promise(resolve => {
        // Prepare url string
        const fullAddressSplitted = (street + " " + city + " " + country).split(" ");
        let addressToSubmit = "";
        fullAddressSplitted.forEach((i) => {
            addressToSubmit += " ";
            addressToSubmit += i;
        });

        const baseUrl = "http://dev.virtualearth.net/REST/v1/Locations/";
        const apiKey = configBing.apiKey.toString();
        const s = baseUrl + addressToSubmit + apiKey;
        http.get(s, res => {
            res.setEncoding("utf8");
            let body = "";

            res.on("data", data => {
                body += data;
            });
            res.on("end", () => {
                body = JSON.parse(body);
                const lat = body.resourceSets[0].resources[0].geocodePoints[0].coordinates[0];
                const long = body.resourceSets[0].resources[0].geocodePoints[0].coordinates[1];
                resolve({"lat": lat, "long": long});
            });
        });
    });
}

module.exports = getCoordinatesByAddress;