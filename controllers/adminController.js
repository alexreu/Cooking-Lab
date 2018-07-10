var mongoose = require('mongoose');
var admins = require('../models/adminModel');
var users = require('../models/utilisateurs');
var bcrypt = require('bcrypt');
var user = require('../models/utilisateurs');


var adminController = {};

// rendu sur la vue creation d'admin
adminController.creer = function (req, res) {
    res.render('../views/admin/addAdmin')
};

// rendu sur la vue login admin
adminController.login = function(req, res){
    res.render('../views/admin/login')
};

// rendu sur l'index admin
adminController.index = function(req, res){
    res.render('../views/admin/index', {
        adminId: req.session.adminId,
        adminMail: req.session.adminMail
    })
};

// fonction listing des utilisateurs
adminController.listUser = function(req, res){
  user.find({}).exec(function (err, user) {
      if(!err){
          res.render('../views/admin/userList', {
              user: user,
              adminId: req.session.adminId,
              adminMail: req.session.adminMail
          })
      }
  })
};

// fonction qui hash le mot de passe et qui le met en bdd
admins.schema.pre('save', function (next) {
    var admin = this;
    bcrypt.hash(admin.password, 10, function (err, hash) {
        if(err){
            next(err);
        }else{
            admin.password = hash;
            admin.passwordConf = hash;
            next();
        }
    })
});

// fonction ajout d'un administrateur
adminController.add = function (req, res) {
    var admin = new admins(req.body);
    if(req.body.password === req.body.passwordConf) {
        admin.save(function (err, result) {
            console.log(result);
            if (!err) {
                res.redirect('/admin');
            } else {
                console.log('error =>', err);
                res.redirect('/admin/creer');
            }
        })
    }
};

// fonction login admin
adminController.auth = function(req, res){
    var email = req.body.mail;
    var password = req.body.password;
    admins.findOne({mail: email}).exec(function (err, admin) {
        console.log(err, admin);
        if(!err && admin){
            bcrypt.compare(password, admin.password, function (err, result) {
                if(result){
                    req.session.adminId = admin._id;
                    req.session.adminMail = admin.mail;
                    res.redirect('/admin/index/');
                }else {
                    console.log("err =>", err);
                    res.redirect('/admin')
                }
            })
        }else {
            console.log("err =>", err);
            res.redirect('/admin');
        }
    })
};

//fonction edition utilisateur
adminController.edit = function(req, res){
    var id = req.body.id;
    var nom = req.body.nom;
    var prenom = req.body.prenom;
    var telephone = req.body.telephone;
    var role = req.body.role;
    users.findByIdAndUpdate(id, {
        $set: {
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            role: role,
        }
    }, function (err, result) {
        console.log(result);
        if(!err){
            res.redirect('/admin/user');
        }else{
            res.redirect('/admin/user');
        }
    })
};

//fonction suppression utilisateur
//adminController.delete = function(req)
// fonction deconnexion
adminController.logout = function(req,res){
    if(req.session){
        req.session.destroy(function (err) {
            if(!err){
                res.redirect('/admin')
            }else{
                console.log('err =>', err);
                res.status(200).send('error');
            }
        })
    }
};
module.exports = adminController;