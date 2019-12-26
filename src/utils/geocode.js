const request = require('request')

// Geocoding
// Address -> Lat/Long -> Weather

// const urlmap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiamFtZXNseSIsImEiOiJjazRrenl3OTYxbHV3M2pxeHlpMnpqMnFnIn0.C50vT1sfepalE5-Hh8VFxw&limit=1'

// request({ url: urlmap, json: true }, (err, res) => {
//     if (err) {
//         console.log('Unable to connect to location service!')
//     } else if (res.body.features.length === 0) {
//         console.log('Unable to find location. Try another search    ')
//     } else {
//         const data = res.body.features[0]
//         // console.log(data)
//         console.log('Lat: ' + data.center[0] + ', Long: ' + data.center[1])
//     }
// })

const geocode = (address, callback) => {
    const urlmap = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamFtZXNseSIsImEiOiJjazRrenl3OTYxbHV3M2pxeHlpMnpqMnFnIn0.C50vT1sfepalE5-Hh8VFxw&limit=1'

    request({ url: urlmap, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (res.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const data = res.body.features[0]
            callback(undefined, {
                latitude: data.center[0],
                longitude: data.center[1],
            })
        }
    })
}

module.exports = geocode