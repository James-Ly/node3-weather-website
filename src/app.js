const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

// Define path for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname, '../public'))

const app = express()

//Modify the port value for heroku
const port = process.env.PORT || 3000

// set handlebars for expressjs, engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Use the static resources
app.use(express.static(path.join(__dirname, '../public')))



/*****************
 * OLD CODE TO TEST THE GET METHOD
 *****************/

// This let us config what the server could do
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'James',
//         age: 27,
//     }, {
//         name: 'Henry',
//         age: 29,
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

/**********************
 * RENDER HANDLEBARS
 **********************/
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'James Ly',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'James Ly'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        exmes: 'Hello World',
        title: 'Help',
        name: 'James Ly',
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            res.send({ error: error })
        } else {
            forecast(data.longitude, data.latitude, (error, forecastData, fData) => {
                if (error) {
                    res.send({
                        error: error
                    })
                } else {
                    res.send({
                        data: data,
                        forecastData: forecastData,
                        fData:fData
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

/******
 * 404 PAGE
 ******/

app.get('/help/*', (req, res) => {
    res.render('404helppage', {
        title: '404',
        name: 'James Ly',
        errorMessage: 'Help article not found',
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404',
        name: 'James Ly',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})