const request = require('request')
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=de4d8e9f9aeadc41181d6e37ac95968c&query='+latitude + ',' + longitude + '&units=f'

request({url,json:true},(error,{body}={})=>{

    if(error)
{callback('Unable to connect',undefined)}
else{
    
    callback(undefined,body.current.weather_descriptions[0] + '. It is currently '+ body.current.precip + ' degrees out. It feels like '+ body.current.feelslike)
}
})
}



module.exports = forecast