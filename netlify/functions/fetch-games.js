// hello there!
// 
// I'm a serverless function that you can deploy as part of your site.
// I'll get deployed to AWS Lambda, but you don't need to know that. 
// You can develop and deploy serverless functions right here as part
// of your site. Netlify Functions will handle the rest for you.


const https = require('https');

exports.handler = async (event, context) => {
    const year = event.queryStringParameters.year;
    const url = `https://api.sportradar.com/nfl/official/trial/v7/en/games/${year}/reg/schedule.xml?api_key=vambt4sCa5XVqVqQCdaKFDVx98n6eMMW70lop61F`;

    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';

            // Accumulate the data
            res.on('data', (chunk) => {
                data += chunk;
            });

            // On end, send the data back
            res.on('end', () => {
                resolve({
                    statusCode: 200,
                    headers: {
                        'Content-Type': 'application/xml',
                    },
                    body: data
                });
            });

        }).on('error', (e) => {
            reject({
                statusCode: 500,
                body: JSON.stringify({ error: 'Error fetching data' })
            });
        });
    });
};
