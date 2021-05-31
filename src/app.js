const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utls/geocode');
const forecast = require('../src/utls/weather');
const app = express()
const port  = process.env.PORT || 3000;
//Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials');


//set up handel bars and views
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Set up static dir to serv
app.use(express.static(publicDirPath));



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Skotow'
    });
});




app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Get help from us',
        name: 'Skotow'
    });
});




app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Skotow'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide valid address'
        });
    }
    geocode(req.query.address, (err, {location} = {}) => {
        if (err) {
            return res.send({err})
        }

        forecast(req.query.address, (erro, {temp, chance} = {}) => {
            if (erro) {
                return res.send({erro})
            }

            res.send({
                location: location,
                temp: "Temperature now is: " + temp + 'C',
                rain: "Chance to rain is:  " + chance + "%"
            });
        })
    })


});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Skotow',
        msg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server start ' + port);
})
