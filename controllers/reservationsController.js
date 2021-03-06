// export du module 
var mongoose = require ('mongoose');
var reservations = require('../models/reservationsModel');
var atelier = require('../models/ateliersModel');

var reservationsController = {};

//Fonction qui permet de lister les atelier reserver par un utilisateur
reservationsController.list = function(req, res){
    reservations.find({}).
    populate('id_user').
    populate('id_ateliers').exec(function (err, ateliers) {
        if(!err){
            
            res.render('../views/mesAteliers',
                {
                    ateliers: ateliers,
                    message: 'Mes Ateliers',
                    id: req.session.userId,
                    role: req.session.userRole,
                    username: req.session.userName,
                }
            )
        }else{
            console.log('error =>', err);
        }
    })
};

//Fonction qui permet de sauvegarder une inscription à un atelier dans la table réservation
reservationsController.save = function (req, res){
    var id_user = req.session.userId;
    var id_atelier =  req.body.id_atelier;
    var reservation = {
        id_user : id_user,
        id_ateliers: id_atelier,
    };
    var reservation = new reservations (reservation);
    reservation.save(function(err,reservations) {
        if(err){
            console.log("error")
        }else {
            console.log("Inscription réussie");

            res.redirect('/ateliersPublicsRoute');
        }
    })
 };


// fonction qui permet d'annuler une reservation
reservationsController.delete = function(req, res){
    var id = req.params.id;
    console.log(id);
    reservations.findByIdAndDelete(id, function (err) {
        if(!err){
            res.redirect('/reservationsRoute/mesAteliers')
        }else{
            console.log("error =>",err);
        }
    })
};


// fonction permettant de decrementer le nombre de place reservées
reservationsController.delReserv = function(req, res){
	var id = req.body.id;
	console.log(id);
	atelier.findByIdAndUpdate(id, {
		$inc:{
			nb_place_res:  -1,
		}
	}, function (err, result) {
		console.log("result =>",result);
		if(err){
			console.log("error =>",err);
		}//else{
		// 	res.send(result);
		// }
	})
};
// exportation du controller
module.exports= reservationsController;