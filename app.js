const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

//Parsing middleware
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));

//parse application/x-www-form-urlencoded
app.use(bodyParser.json());

//static files
app.use(express.static('public'));

//Templating engine
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs');

//routes
app.get('', (req, res) =>{
    res.render('home');
})

app.listen(port, () => console.log(`listening on port ${port}`));
