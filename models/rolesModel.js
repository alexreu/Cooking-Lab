var mongoose = ('mongoose');

// Schema de données de la collection ateliers

var rolesSchema = new mongoose.Schema ({
   role_name : String,
});


// module qui permet d'exporter le modèle du schéma de données de la collection roles 
module.exports = mongoose.model("roles", rolesSchema);