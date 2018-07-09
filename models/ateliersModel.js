var mongoose = require('mongoose');

// Schema de données de la collection ateliers
var ateliersSchema = new mongoose.Schema ({
    id_cuisinier: [{type: mongoose.Schema.ObjectId, ref: 'roles'}],
    titre : String,
    description : String,
    date : String,
    duree : String,
    nb_place_disp : Number,
    nb_place_res : Number,
    prix : String,
    img : String,
    statut: {
        type: Boolean,
        default: true,
    }
});


// module qui permet d'exporter le modèle du schéma de données de la collection ateliers 
module.exports = mongoose.model("ateliers", ateliersSchema);