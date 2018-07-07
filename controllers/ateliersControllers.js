//export du module
var mongoose = require('mongoose');
var ateliers = require('../models/ateliersModel');
var fs = require('fs');

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
	var img = req.files.img;
	console.log(img);
	img.mv('public/img/uploads/'+img.name , function (err) {
		if(err){
			console.log("error =>", err)
		}
	});
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
	//console.log(document);

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
	var id = req.body.idAtelier;
	var titre = req.body.titre;
	var description = req.body.description;
	var nb_place_disp = req.body.nb_place_disp;
	var duree = req.body.duree;
	var date = req.body.date;
	var prix = req.body.prix;
	ateliers.findByIdAndUpdate(id, {
		$set: {
			titre : titre,
			description : description,
			nb_place_disp : nb_place_disp,
			duree : duree,
			date : date,
			prix : prix,
		}
	}, function (err) {
		if(!err){
			res.redirect('/ateliersRoute');
		}else{
			res.redirect('/ateliersRoute');
		}
	})
};


// exportation du controller
module.exports= ateliersController;