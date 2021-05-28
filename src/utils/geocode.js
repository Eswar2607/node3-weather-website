const request = require('request')

const geocode = (address , callback) => {
 
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZXN3YXIyNjA3IiwiYSI6ImNrcDB5ZXo5ZTFmNXUycG1wcHlva2s1aGcifQ.7P4adyoTfCheaS-RGf0CpA&limit=1'

    request({ url , json: true } ,(error , {body} ) => {
        if(error){
            callback('Unable to connect to location service', undefined)
        }
        else if(body.features.length === 0){
            callback('unable to find loacation try another search', undefined)
        }
        else{
            callback(undefined ,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })

        }
    })
}

module.exports = geocode
