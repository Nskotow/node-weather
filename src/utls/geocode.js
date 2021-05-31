const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic2tvdG93IiwiYSI6ImNrcDU4YjcxODFyYjczMm13dGx1eWFzdDEifQ.oK_VFH3vUfB1JvvF25A8Ag&limit=1';
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unuble to connect', undefined)
        }else if(response.body.features.length === 0){
            callback('Can not find location try again', undefined)
        }else{

            callback(undefined,  {
                latitude: response.body.features[0].center[0],
                longtitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            });
        }
    })

}


module.exports = geocode
