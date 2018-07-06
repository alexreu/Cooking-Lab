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
    var atelier = new ateliers (req.body);

    atelier.save(function (err) {
        if(err){
            console.log("err =>", err);
            res.redirect('/ateliersRoute/creer');
        }else {
            res.redirect('/ateliersRoute');
        }
    })
};



// exportation du controller
module.exports= ateliersController;