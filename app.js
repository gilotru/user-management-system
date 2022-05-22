const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

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
const handlebars = exphbs.create({extname: '.hbs'});
app.engine('hbs', handlebars.engine);
app.set('view engine', 'hbs');

//connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

pool.getConnection((err, Connection) =>{
 if (err) throw err; //not connected
 console.log('connected as ID', Connection.threadId)
});

//routes
app.get('', (req, res) =>{
    res.render('home');
});

app.listen(port, () => console.log(`listening on port ${port}`));