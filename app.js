const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

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

const routes = require('./server/route/user');
app.use('/', routes);

app.listen(port, () => console.log(`listening on port ${port}`));