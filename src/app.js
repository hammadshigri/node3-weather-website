const path = require('path')
const request = require('request')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000
// Define paths for express config
const publicDirectoryPath= path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))

// Setup static dir
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'hammad'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help me',
        name:'hammad'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'hammad'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
return res.send({
    error:'u must provide address'
})
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
          return res.send({error})
        }
        
        forecast(latitude,longitude, (error, forecastData) => {
          if(error){
            return res.send({error})
          }
          res.send({location,forecastData})
          
        })
        })

    //
//     res.send([{
//         weather:'its 50C'
//     },
//     {
//         location:'Islamabad'
//     },
//     {
//         address:req.query.address
//     }
// ])
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
return res.send({
    error:'You must provide a search term'
})
    }
    console.log(req.query.search)
    
    res.send(
        {
            products:[]
        }
    )
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
    errorMessage : 'Article not found',
    name:'hammad'
    })})
app.get('*',(req,res)=>{
 res.render('404',{
     errorMessage : 'Error 404..Page not found',
     name:'hammad'
 })
})
app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})