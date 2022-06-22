const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const database = require('./database/connection');
const port = 3000

// View Engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.render('index');
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
