const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userController = require('../controllers/user.controller');

router.use('/', (req, res, next)=>{
    let token = req.headers['authorization']
    if(!token){
        req.user = null;
        next();
        return
    }

    token = token.replace('Bearer ', '');
    jwt.verify(token, '1234', (err, user)=>{
        if(err){
            req.user = null;
            next();
        } else{
            req.user = user;
            next();
        }
    })
})

router.use('/secure', (req, res, next)=>{
    if(req.user === null){
        res.status(401).send({
            ok: false,
            message: 'Invalid Token'
        });
        return
    }
    next();
})

// public
router.post('/singup', userController.singup);
router.post('/login', userController.login);
router.get('/usernameValidate/:username', userController.usernameValidate);
router.get('/profile/:user', userController.getProfileByUsername);

// private
router.put('/secure/profile', userController.updateProfile);
router.get('/secure/relogin', userController.relogin);
router.delete('/secure/delete/:id', userController.deleteUser);

module.exports = router;