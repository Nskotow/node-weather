const request = require('request');
const weather = (location, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=c077671266f689b2c5f06e525449b3fc&query="+location;
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Something went wrong', undefined)
        } else {
            callback(undefined, {
                temp: response.body.current.temperature,
                chance: response.body.current.precip
            })
        }
    })

}

module.exports = weather
