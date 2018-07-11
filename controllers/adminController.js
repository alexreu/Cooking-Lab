var mongoose = require('mongoose');
var admins = require('../models/adminModel');
var users = require('../models/utilisateurs');
var bcrypt = require('bcrypt');
var user = require('../models/utilisateurs');
var atelier = require('../models/ateliersAffecter');
var atelierNoAffect = require('../models/ateliersModel');
const flash = require('express-flash-notification');


var adminController = {};

// rendu sur la vue login admin
adminController.login = function(req, res){
    res.render('../views/admin/login')
};

// rendu sur l'index admin
adminController.index = function(req, res){
    var date = new  Date();
    var dd = date.getDate();
    var mm = date.getMonth();
    var yy = date.getFullYear();
    var dateFormat = dd + "/" + mm + "/" + yy;
	console.log(req.session);
    res.render('../views/admin/index', {
        adminId: req.session.adminId,
        adminMail: req.session.adminMail,
        date: dateFormat
    });
	req.session.success = "";
	console.log(req.session.success);
};

// rendu sur l'ajout d'un admin
adminController.createAdmin = function(req, res){
    res.render('../views/admin/addAdmin', {
        adminId: req.session.adminId,
        adminMail: req.session.adminMail
    });
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

// fonction listing des ateliers
adminController.listAtelier = function(req, res){
    atelier.find({}).
    populate('id_atelier').
    populate('id_cuisinier').exec(function (err, atelier) {
        if(!err){
            res.render('../views/admin/atelierList', {
                atelier: atelier,
                adminId: req.session.adminId,
                adminMail: req.session.adminMail
            })
        }
    })
}
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
        admin.save(function (err) {
            if (!err) {
                res.redirect('/admin/index');
            } else {
                console.log('error =>', err);
                res.redirect('/admin/create');
            }
        })
    }
};

// fonction login admin
adminController.auth = function(req, res){
    var email = req.body.mail;
    var password = req.body.password;
    admins.findOne({mail: email}).exec(function (err, admin) {
        if(!err && admin){
            bcrypt.compare(password, admin.password, function (err, result) {
                if(result){
                    req.session.adminId = admin._id;
                    req.session.adminMail = admin.mail;
                    //req.flash('success', 'Connexion Réussi');
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
    user.findByIdAndUpdate(id, {
        $set: {
            nom: nom,
            prenom: prenom,
            telephone: telephone,
            role: role,
        }
    }, function (err) {
        if(!err){
            res.redirect('/admin/user');
        }else{
            res.redirect('/admin/user');
        }
    })
};

//fonction suppression utilisateur
adminController.delete = function(req, res){
    var id = req.params.id;
    user.findByIdAndDelete(id, function (err, result) {
        console.log('utilisateur supprimé =>', result);
        if(!err){
            res.redirect('/admin/user');
        }else {
            res.redirect('/admin/user');
        }
    })
};

// fonction suppression d'un atelier
adminController.deleteAtelier = function(req, res){
    var id = req.params.id;
    console.log("je suis id en param",id);
    atelierNoAffect.findByIdAndDelete(id, function (err, result) {
        if(!err){
            res.redirect('/admin/atelier');
        }else{
            console.log("error =>", err);
            res.redirect('/admin/atelier');
        }
    })
};

//fonction suppression affectation atelier
adminController.delAffect = function(req, res){
    var id = req.body.id;
    atelier.findByIdAndDelete(id, function (err, result) {
        if(!err){
            console.log("success", result);
            res.redirect('/admin/atelier')
        }else{
            console.log("error =>", err);
            res.redirect('/admin/atelier')
        }
    })
}
// fonction deconnexion admin
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