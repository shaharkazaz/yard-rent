const https = require('https');

module.exports = {
    getAirPollution: (req, res) => {
        https.get('https://c4qp859qid.execute-api.us-east-1.amazonaws.com/start/pollution', (resp) => {
                    let data = '';

                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk;
                    });

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        res.status(200).json(data)
                    });

                }).on("error", (error) => {
                    res.status(500).json(error)
                });
    }
}
