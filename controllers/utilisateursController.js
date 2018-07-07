//Controller pour les utilisateurs
var mongoose = require('mongoose');
var utilisateurs = require("../models/utilisateurs");
var bcrypt = require('bcrypt');

var utilisateursController = {};

utilisateursController.home = function(req, res){
    res.render('../views/index', {
        username: req.session.userName,
	    id: req.session.userId
    })
};

// fonction qui hash le mot de passe et qui le met en bdd
utilisateurs.schema.pre('save', function (next) {
	var utilisateur = this;
	bcrypt.hash(utilisateur.password, 10, function (err, hash) {
		if(err){
			next(err);
		}else{
			utilisateur.password = hash;
			utilisateur.passwordConf = hash;
			next();
		}
	})
});

//fonction qui permet l'enregistrement d'un nouvel utilisateur
utilisateursController.save = function(req, res){
    var utilisateur = new utilisateurs (req.body);

    utilisateur.save(function(err, result){
        console.log(result);
        if(err){
        //req.body.error = 'Echec création utilisateur'
            console.log(err);
            res.redirect("/");
        } else{
            console.log("creation utilisateur OK");
         //   req.session.success = 'Utilisateur créé et enregistré avec succès'
            res.redirect("/");
    
        } 
    });
};

// fonction login utilisateurs
utilisateursController.login = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	console.log(email);
	console.log(password);
	utilisateurs.findOne({email: email }).exec(function (err, user) {
		if(!err && user){
			bcrypt.compare(password, user.password, function (err, result) {
				if(result === true){
					req.session.userName = user.prenom;
					req.session.userId = user._id;
					res.redirect('/');
				}else {
					console.log('err =>', err);
					res.redirect('/');
				}
			})
		}else {
			console.log("error =>", err);
			res.redirect('/');
		}
	})
};

// fonction permettant la desctruction de la sessions et donc le logout
// de l'utilisateur
utilisateursController.logout = function(req, res){
	if (req.session){
		req.session.destroy(function (err) {
			if(!err){
				res.redirect('/')
			}else {
				console.log('err =>', err);
			}
		})
	}
};
// module qui permet d'exporter le Controller utilisateur
module.exports = utilisateursController;
