//export du module
var mongoose = require('mongoose');
var taches = require('../models/ateliers');




/*controller pour les ateliers */
var ateliersController = {};



// Fonction qui permet d'afficher la liste des ateliers
ateliersController.lister= function (req, res){
    ateliers.find({}), exec(function(err, ateliers){
        if (err){
            console.log('Error: ', err);
        }else{
            res.render("../views/ateliers/ateliers")
        }
    });

}