const https = require('https');

module.exports = {
    getAirPollution: (req, res) => {
        https.get('https://api.airvisual.com/v2/city?city=Tel%20Aviv-Yafo&state=Tel%20Aviv&country=israel&key=2387c42e-f4db-41da-b467-c2b735d72f16', (resp) => {
                    let data = '';

                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        res.status(200).json(JSON.parse(data).data.current.pollution.aqius)
                    });

                }).on("error", (error) => {
                    res.status(500).json(error)
                });
    }
}
