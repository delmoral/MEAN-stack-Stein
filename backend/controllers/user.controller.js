const authService = require('../services/auth.service');
const Profile = require('../models/profile');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userController = {};

userController.singup = (req, res, err) =>{
    const newProfile = new Profile({
        name: req.body.name,
        userName: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    })

    newProfile.save()
        .then(()=>{
            res.send({
                ok: true,
                body: {
                    profile: newProfile
                }
            })
        }).catch(err =>{
            console.log(err);
            res.send({
                ok:false,
                message: 'Error creando usuario'
            })
        })

};

userController.usernameValidate = (req, res, err) =>{
    Profile.find({userName: req.params.username})
        .then((profiles)=>{
            if(profiles.length > 0) throw {message:'User used'}
            res.status(200).send({
                ok:true,
                message: 'User available'
            })
        }).catch((err)=>{
            res.status(200).send({
                ok:false,
                message: 'Validating name error'
            })
        })
};

userController.login = (req, res, err) =>{
    Profile.findOne({ userName: req.body.username})
    .then(profile => {
        if(profile == null){
            res.send({
                ok: false,
                message: "User not found"
            })
            return
        }

        bcrypt.compare(req.body.password, profile.password, (err, valid) =>{
            if(!"valid"){
                return res.send({
                    ok: false,
                    message: "Invalid password"
                });
            }

            const user = {
                username: req.body.username,
                id: profile._id
            }

            const token = authService.generateToken(user);

            res.send({
                ok:true,
                profile: {
                    id: profile.id,
                    name: profile.name,
                    userName: profile.userName,
                    created_at: profile.created_at
                },
                token: token
            });
        }).catch(err => {
            res.send({
                ok:false,
                message: "Error validating user"
            })
        })
    })
};

userController.relogin = () =>{

};

userController.getProfileByUsername = (req, res, err) =>{
    const user = req.params.user;
    if(user === null){
        res.send({
            ok: false,
            message: "'user' param required"
        })
    }

    Profile.findOne({userName: user})
    .then(user =>{
        if(user === null){
            res.send({
                ok: false,
                message: 'User dont exist'
            })
            return
        }

        res.send({
            ok: true,
            body:{
                _id: user.id,
                name: user.name,
                userName: user.userName,
                avatar: user.avatar,
                created_at: user.created_at
            }
        })
    }).catch(err =>{
        res.send({
            ok: false,
            message: "Error getting user data"
        })
    })
};

userController.updateProfile = () =>{

};

userController.deleteUser = async (req, res) =>{
    await Profile.findByIdAndDelete(req.params.id);
    res.json({'status': 'User Removed'});
}

module.exports = userController;