var mongoose = require('mongoose');

// Schéma de données de la collection participants
var utilisateursSchema = new mongoose.Schema({
    nom : String,
    prenom : String,
    email: {
        type: String,
        unique: true
    },
    telephone : String,
	password: String,
	passwordConf: String,
    role: String,
        
});

// Module qui permet d'exporter le modèle du schéma de données de la collection participants 
module.exports = mongoose.model("utilisateurs", utilisateursSchema);