const request = require('request')

const forecast = (latitude , longitude , callback) =>{

    const url ='http://api.weatherstack.com/current?access_key=ac06965e6426a24f1e055696574ef8fd&query=' + latitude + ',' + longitude  

    request ({ url , json:true}, (error , {body}) => {
        if(error){
            callback('unable to find loacation',undefined)
        }
        else if(body.error){
            callback('unable to find match',undefined)
        }
        else{
        
            callback (undefined ,body.current.weather_descriptions[0] +' It is currently ' + body.current.temperature+' degrees out .And its feeling like '+ body.current.feelslike +' degrees out , And the humidity is ' + body.current.humidity +'%')
        }
    })

}

module.exports = forecast