
const mongoose = require("mongoose"); // mongoose hia bibliotheque ily tconnecti node bil mongodb

const taskSchema = new mongoose.Schema({ // bch na3mlou structure mta3 task (les champs et les regles)
 
    titre: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        default: ""
    },

    statut: {  // ya3tik avancement mta3 task
        type: String,
        enum: ["todo", "doing", "done"], // yi9bil kan les 3 valeurs hathoum 
        default: "todo" // par defaut bach yhothalik todo
    },

    deadline: {
        type: Date   // optionnelle
    },

    projet: {   // houni el projet ily tentami lih el task
        type: mongoose.Schema.Types.ObjectId, // y5azen el identifiant ily jey min projet
        ref: "Project", // lien vers projet
        required: true // obligatoire lazem el task yintami li projet
    },

    utilisateurAssigne: { // el personne ily respsonsable 3la task
        type: mongoose.Schema.Types.ObjectId, // y5azen id de user
        ref: "User",
        default: null // milowel el task mahich assigné li hata had w c'est pas obligatoire d'assigner un user
    }, 


    dateCreation: {
        type: Date,
        default: Date.now // tithat par defaut el date de l'insertion mta3 task
    }

});

module.exports = mongoose.model("Task", taskSchema); // ywali model utilisable w tnajem tista3mel el model hatha fi des fichiers o5rin bil require

