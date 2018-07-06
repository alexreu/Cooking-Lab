//export du module
var mongoose = require('mongoose');
var ateliers = require('../models/ateliersModel');

/*controller pour les ateliers */
var ateliersController = {};


// Fonction qui permet d'afficher la liste des ateliers
ateliersController.lister= function (req, res){
    ateliers.find({}).exec(function(err, ateliers){
        if (err){
            console.log('Error: ', err);
        }else{
            res.render("../views/ateliers/ateliers")
        }
    });

};

ateliersController.creer = function(req, res){
    res.render('../views/ateliers/addAteliers');
};

ateliersController.save = function(req, res){
    var atelier = new atelier(req.body);

    atelier.save(function (err) {
        if(err){
            console.log("err =>", err);
            res.redirect('/ateliersRoute/creer');
        }else {
            res.redirect('/ateliersRoute');
        }
    })
}



module.exports= ateliersController;