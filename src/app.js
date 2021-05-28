const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))
const viewpaths = path.join(__dirname,'../templates/views')
const partialviews = path.join(__dirname,'../templates/partials')

const app = express() 

const port = process.env.PORT || 3000

const publicDirectory = path.join(__dirname, '../public')

app.set('view engine' , 'hbs')
hbs.registerPartials(partialviews)

app.set('views', viewpaths)


app.use(express.static(publicDirectory))



app.get('' ,(req , res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Eswar'
    })

    
})

app.get('/about' , (req , res) => {
    res.render('about',{
        title : 'Some Random',
        name : 'Eswar'
    })
})

app.get('/help' , (req , res) => {
    res.render('help', {
        title : 'Help Page',
        helptext : 'This is Help Page',
        name :'Eswar'
    })
})

app.get('/weather' , (req , res) => {

    if(!req.query.address){
       return res.send({
            error:'Please Provide specific Address'
        })

    }

    geocode(req.query.address , (error , {latitude , longitude , location}) => {

        if(error){
            return res.send({
                error : 'Error'
            })
        }

        forecast(latitude , longitude , (error , forecastData) => {
            if(error){
                res.send({
                    error:'Error'
                })
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })

    })

    // res.send({
    //     forecast : 'It is Cool',
    //     location : 'Bhimavaram',
    //     address : req.query.address
    // })
})

app.get('/products' , (req , res) => {

    if(!req.query.search){

     return res.send({
            error : 'You must provide a search term'
        })

    }


    console.log(req.query.search)

    res.send({
        products : []
    })
})

app.get('/help/*' , (req , res) => {
    res.render('404', {
        title : 404,
        name:'Eswar',
        errorMessage:'Help article not found'
    })
})

app.get('*',(req , res) => {
    res.render('404', {
        title : 404,
        name :'Eswar',
        errorMessage : 'Page not found'
    })
})




app.listen(port , () => {
    console.log('server is up on port ' + port)
}) 