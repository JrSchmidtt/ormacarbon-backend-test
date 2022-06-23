const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database/connection');
const session = require('express-session');
const port = 3000

app.use(session({
    secret: '!@&l#umsKIgqI$XLViBaF^8$FS#mlpNJ@@*SZ5pjRfArrfBDrQ',
    cookie: { maxAge: 300000000 },
    resave: true,
    saveUninitialized: true
}))

// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
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
app.use('/', usersController);

app.get('/', (req, res) => {
    res.render('index'); 
})

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/profile', userAuth, (req, res) => {
    res.render('profile');
})

function userAuth(req, res, next) {
    if (req.session.user != undefined) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/:link', (req, res) =>{
    var link = req.params.link;
    User.findOne({
        where: {
            link:link
        }
    }).then(link =>{
        if(link != undefined){
            User.findAll().then(link => {
                res.render('signup', {link:link});
            })
        }else{
            res.redirect('/');
        }
    }).catch(err =>{
        res.redirect('/');
    })
})

// database MYSQL
database
    .authenticate()
    .then(() => {
        console.log('Database connected!')
    }).catch((error) => {
        console.log(error);
    })

app.listen(port, () => console.log(`listening on port ${port}!`))
