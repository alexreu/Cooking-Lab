//export du module
var mongoose = require('mongoose');
var ateliers = require('../models/ateliersModel');

// controller atelier
var ateliersController = {};


// Fonction qui permet d'afficher la liste des ateliers
ateliersController.lister= function (req, res){
	ateliers.find({}).exec(function(err, ateliers){
		if (err){
			console.log('Error: ', err);
		}else{
			res.render("../views/ateliers/ateliers", {
				data: ateliers
			})
		}
	});

};

// fonction permettant de faire un rendu sur la vue addAteliers.ejs
ateliersController.creer = function(req, res){
	res.render('../views/ateliers/addAteliers');
};

// fonction permettant sauvegarder les ateliers en bdd
ateliersController.save = function(req, res){
	// fonction qui permet de deplacer l'image uploader dans un dossier précis
	var img = req.files.img;
	console.log(img);
	img.mv('public/img/uploads/'+img.name , function (err) {
		if(err){
			console.log("error =>", err)
		}
	});
	// creation d'un object document
	var document = {
		titre : req.body.titre,
		description : req.body.description,
		nb_place_disp : req.body.nb_place_disp,
		nb_place_res : req.body.nb_place_res,
		duree : req.body.duree,
		date : req.body.date,
		prix : req.body.prix,
		img : req.files.img.name,
	};
	// utilisation de l'objet document pour creer un nouvel ateliers
	var atelier = new ateliers(document);
	atelier.save(function (err) {
		if(err){
			console.log("err =>", err);
			res.redirect('/ateliersRoute/creer');
		}else {
			res.redirect('/ateliersRoute');
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
	console.log(req.body.img);
	// recuperation des tous les champs du formulaire à editer
	var id = req.body.idAtelier;
	var titre = req.body.titre;
	var description = req.body.description;
	var nb_place_disp = req.body.nb_place_disp;
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
			nb_place_res: nb_place_res,
			duree: duree,
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