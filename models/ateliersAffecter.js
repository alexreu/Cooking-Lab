var mongoose = require('mongoose');

// schéma de données de la collection ateliersCreer
var atelierCreerSchema = new mongoose.Schema({
    id_atelier : [{type: mongoose.Schema.ObjectId, ref: 'ateliers'}],
    id_cuisinier: [{type: mongoose.Schema.ObjectId, ref: 'utilisateurs'}]
});

module.exports = mongoose.model('ateliersAffecter', atelierCreerSchema);