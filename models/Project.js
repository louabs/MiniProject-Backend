
const mongoose = require("mongoose"); // mongoose hia bibliotheque ily tconnecti node bil mongodb


const projectSchema = new mongoose.Schema({ // bch na3mlou structure mta3 projet (les champs et les regles)
 
    nom: {
        type: String,
        required: true, // el nom obligatioire fi creation de projet 
        trim: true
    },

    description: {
        type: String,
        default: "" // kan manhotou chay par defaut tji vide
    },

    proprietaire: { 
        type: mongoose.Schema.Types.ObjectId, // y5azen el identifiant mta3 utilisatuer ily jey min user
        ref: "User", // ya3mel lien m3a model user 3ibara 3la clé entrangere
        required: true
    },

    statut: {
        type: String,
        enum: ["en cours", "terminé", "en pause"], // ken les 3 valeurs hathouma sont acceptés
        default: "en cours"
    },

    dateCreation: {
        type: Date,
        default: Date.now // tithat automatiquement bil date où le projet est crée
    }

});

module.exports = mongoose.model("Project", projectSchema); // ywali model utilisable w tnajem tista3mel el model hatha fi des fichiers o5rin bil require
