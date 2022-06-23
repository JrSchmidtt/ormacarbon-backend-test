const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database/connection');
const port = 3000

// Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// View Engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

//Models
const User = require('./models/User');

//Controllers
const usersController = require('./controller/UserController')

// Routers
app.get('/', (req, res) =>{res.render('index');})
app.use('/',usersController);

app.get('/signup', (req, res) =>{
    res.render('signup');
})

// database MYSQL
database
    .authenticate()
    .then(() => {
        console.log('Database connected!')
    }).catch((error) =>{
        console.log(error);
    })

app.listen(port, () => console.log(`API listening on port ${port}!`))
