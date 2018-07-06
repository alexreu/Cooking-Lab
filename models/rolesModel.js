var mongoose = ('mongoose');

// Schema de données de la collection ateliers
var rolesSchema = new mongoose.Schema ({
    id_cuisinier: [{type: mongoose.Schema.ObjectId, ref: 'roles'}],// clé permettant de créer une jointure avec une autre collection (roles)
    id_utilisateur: [{type: mongoose.Schema.ObjectId, ref: 'utilisateur'}],// clé permettant de créer une jointure avec une autre collection (utilisateurs)

});


// module qui permet d'exporter le modèle du schéma de données de la collection roles 
module.exports = mongoose.model("roles", rolesSchema);