var mongoose = require('mongoose');

// schema de données de la collection reservations
var reservationsSchema = new mongoose.Schema({
    id_user : [{type: mongoose.Schema.ObjectId, ref: 'utilisateurs'}],
    id_ateliers :  [{type: mongoose.Schema.ObjectId, ref: 'ateliers'}],
});




// module qui permet d'exporter le modèle du schéma de données de la collection reservations 
module.exports = mongoose.model("reservations", reservationsSchema);