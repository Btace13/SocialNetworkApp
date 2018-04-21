const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport');

//Load Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');



//@Route:           /api/user/test
//@Description:   Test
//@Access:          Public
router.get('/test', (req, res) => res.json({msg: 'user works'}) );

//@Route:           /api/user/register
//@Description:   Register a user
//@Access:          Public
router.post('/register', (req,res) => {
    const {errors, isValid} = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email})
        .then(user => {
            if (user){
                errors.email =  'Email already exist';
                return res.status(400).json(errors)
            } else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    avatar

                })
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => {console.log(err)})

                    })
                })
            }
        })
})

//@Route:           /api/user/login
//@Description:   Login a user
//@Access:          Public
router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;


    User.findOne({email})
        .then( user => {
        if (!user) {
            errors.email = 'User not found';
             return res.status(404).json(errors)
        }
        bcrypt.compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                   jwt.sign(payload, keys.secretOrKey, {expiresIn: 3600}, (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })
                   } );
                }
                else {
                    errors.password = 'Wrong Password';
                    return res.status(400).json(errors)
                }
            })
    })
})


//@Route:           /api/user/current
//@Description:   Return current user info
//@Access:          Private
router.get('/current', passport.authenticate('jwt', {session: false} ), (req, res) => {
   res.json(req.user);
});

module.exports = router;