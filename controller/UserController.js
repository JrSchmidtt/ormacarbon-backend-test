const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const slugify = require('slugify');

router.post('/signup', (req, res) => {
    var email = req.body.email;
    var name = req.body.name;
    var password = req.body.password;
    var phone = req.body.phone;
    var link = slugify(req.body.name + '-' + Date.now(), { lower: true, strict: true, })
    User.findOne({ where: { email: email } }).then(user => {
        if (user == undefined) {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            User.create({
                email,
                name,
                phone,
                link,
                points: 5,
                password: hash
            }).then(() => {
                res.redirect('/');
            }).catch((err) => {
                res.redirect('/');
            })
        } else {
            res.redirect('/signup');
        }
    })
});

router.post('/login', (req, res) =>{
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({where:{email: email}}).then(user =>{
        if(user != undefined){ 
            var correct = bcrypt.compareSync(password,user.password);
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                res.redirect('/');
            }else{
                res.redirect('/login');
            }
        }else{
            res.redirect('/login');
        }
    });
})

module.exports = router;