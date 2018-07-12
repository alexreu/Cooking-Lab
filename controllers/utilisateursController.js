//Controller pour les utilisateurs
var mongoose = require('mongoose');
var utilisateurs = require("../models/utilisateurs");
var bcrypt = require('bcrypt');

var utilisateursController = {};

utilisateursController.home = function(req, res){
    res.render('../views/index', {
        username: req.session.userName,
	    id: req.session.userId,
        role: req.session.userRole,
		message : "Cooking'Lab - Accueil",
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
    var password = req.body.password;

    var passwordConf = req.body.passwordConf;
    if (password !== passwordConf){
    	console.log("error mot de passe non identique");
		res.redirect('/');
	}else{
        utilisateur.save(function(err){
            if(err){
                console.log(err);
                res.redirect("/");
            } else{
                console.log("creation utilisateur OK");
                res.status(201);
                res.redirect("/");

            }
        });
    }
};

// fonction login utilisateurs
utilisateursController.login = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	utilisateurs.findOne({email: email }).exec(function (err, user) {
		console.log(err, user);
		if(!err && user){
			bcrypt.compare(password, user.password, function (err, result) {
				if(result === true){
					console.log(user.role);
					req.session.userName = user.prenom;
					req.session.userId = user._id;
					req.session.userRole = user.role;
					res.status(202);
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
