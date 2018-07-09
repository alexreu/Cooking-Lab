var mongoose = ('mongoose');

// Schema de données de la collection ateliers
var groupesSchema = new mongoose.Schema ({
    id_utilisateur: [{type: mongoose.Schema.ObjectId, ref:'utilisateurs'}],
    id_role: [{type: mongoose.Schema.ObjectId, ref: 'roles'}]

});


// module qui permet d'exporter le modèle du schéma de données de la collection groupes 
module.exports = mongoose.model("groupes",groupesSchema);