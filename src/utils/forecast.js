const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/11e5d5cb66c7d904387c26859ad2b54a/'+long+','+lat+'?units=si'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = response.body.currently
            // console.log('It is currently ' + data.temperature + ' degrees out. There is a ' + data.precipProbability + '% chance of rain.')
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + data.temperature + ' degrees out. There is a ' + data.precipProbability + '% chance of rain.')

        }
    })
}

module.exports = forecast