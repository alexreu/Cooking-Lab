//export du module
var mongoose = require('mongoose');
var ateliers = require('../models/ateliersModel');
var reservations = require('../models/reservationsModel');
var ateliersAffecter = require('../models/ateliersAffecter');

// controller atelier
var ateliersController = {};


// fonction permettant de faire un rendu sur la vue addAteliers.ejs
ateliersController.creer = function(req, res){
	res.render('../views/ateliers/addAteliers', {
		id: req.session.userId,
		role: req.session.userRole,
		username: req.session.userName,
	});
};

// fonction permettant sauvegarder les ateliers en bdd
ateliersController.save = function(req, res){
	// fonction qui permet de deplacer l'image uploader dans un dossier précis
	if (req.files.img) {
        var img = req.files.img;
        img.mv('public/img/uploads/' + img.name, function (err) {
            if (err) {
                console.log("error =>", err)
            }
        });
    }
	// creation d'un object document
	var document = {
		titre : req.body.titre,
		description : req.body.description,
		nb_place_disp : req.body.nb_place_disp,
		nb_place_res : req.body.nb_place_res,
		duree : req.body.duree,
		heure_debut: req.body.time,
		date: req.body.date,
		prix: req.body.prix,
		img: req.files.img.name,
	};
	// utilisation de l'objet document pour creer un nouvel ateliers
	var atelier = new ateliers(document);
	atelier.save(function (err, result) {
		if(err){
			console.log("err =>", err);
			res.redirect('/ateliersRoute/creer');
		}else {
			var saving = {
				id_atelier : result._id,
				id_cuisinier : req.session.userId,
			};
			var atelierAffecte = new ateliersAffecter(saving);
			atelierAffecte.save(function (err) {
				if(!err){
					res.redirect('/ateliersRoute');

				}else{
					res.redirect('/ateliersRoute');
				}
			});
		}
	})
};

// fonction permettant d'éditer un atelier
ateliersController.edit = function(req, res){
	// fonction qui permet de deplacer l'image uploader dans un dossier précis
	// si on change l'image alors on execute la fonction
	if(req.files.img){
		var img = req.files.img;
		console.log(img);
		img.mv('public/img/uploads/'+img.name , function (err) {
			if(err){
				console.log("error =>", err)
			}
		});
	}
	// recuperation des tous les champs du formulaire à editer
	var id = req.body.idAtelier;
	var titre = req.body.titre;
	var description = req.body.description;
	var nb_place_disp = req.body.nb_place_disp;
	var time = req.body.time;
	var duree = req.body.duree;
	var date = req.body.date;
	var prix = req.body.prix;
	// si on change d'image alors l'image se change sinon on conserve la meme image
	if (req.files.img){
		var img = req.files.img.name;
	}else {
		var img = req.body.currentImg;
	}
	ateliers.findByIdAndUpdate(id, {
		$set: {
			titre: titre,
			description: description,
			nb_place_disp: nb_place_disp,
			duree: duree,
			heure_debut: time,
			date: date,
			prix: prix,
			img: img,
		}
	}, function (err) {
		if(!err){
			res.redirect('/ateliersRoute');
		}else{
			res.redirect('/ateliersRoute');
		}
	})
};

// desactiver de l'atelier
ateliersController.desactiver = function(req, res){
	var id = req.params.id;
	ateliers.findByIdAndUpdate(id, {
		$set: {
			statut: false,
		}
	}, function (err) {
		if(!err){
			res.redirect('/ateliersRoute');
		}else{
			console.log("error =>", err);
			res.redirect('/ateliersRoute');
		}
	})
};

// fonction permettant d'activer un atelier desactiver
ateliersController.activer = function(req, res){
	var id = req.params.id;
	ateliers.findByIdAndUpdate(id, {
		$set: {
			statut: true,
		}
	}, function (err) {
		if(!err){
			res.redirect('/ateliersRoute');
		}else{
			console.log('error =>', err);
			res.redirect('/ateliersRoute');
		}
	})
};

// exportation du controller
module.exports= ateliersController;