const authService = require('../services/auth.service');
const Profile = require('../models/profile');
const bcrypt = require('bcrypt');

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
                message: 'Error creating user'
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
                message: 'User unavailable'
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

userController.relogin = (req, res, err) =>{
    let userToken = {
        id: req.user.id,
        username: req.user.username
    }
    let newToken = authService.generateToken(userToken);

    Profile.findOne({_id: req.user.id})
    .then(profile =>{
        if(profile === null){
            res.send({
                ok: false,
                message: "User doesnt exist"
            })
        }else{
            res.send({
                ok:true,
                profile: {
                    id:profile.id,
                    name: profile.name,
                    userName: profile.userName,
                    created_at: profile.created_at
                },
                token: newToken
            });
        }
    }).catch(err =>{
        res.send({
            ok:false,
            message: "Error finding user"
        })
    })
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

userController.updateProfile = (req, res, err) =>{
    let username = req.body.username
    const updates = {
        name: req.body.name,
        avatar: req.body.avatar
    }

    Profile.update({userName: username}, updates)
    .then(updates =>{
        res.send({
            ok: true
        })
    }).catch(err =>{
        res.send({
            ok:false,
            message:"Error updating"
        })
    })
};

userController.deleteUser = async (req, res) =>{
    await Profile.findByIdAndDelete(req.params.id);
    res.json({'status': 'User Removed'});
}

module.exports = userController;