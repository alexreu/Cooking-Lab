var mongoose = ('mongoose');

// Schema de données de la collection ateliers
var groupesSchema = new mongoose.Schema ({
    cuisinier: String,

});


// module qui permet d'exporter le modèle du schéma de données de la collection groupes 
module.exports = mongoose.model("groupes",groupesSchema);