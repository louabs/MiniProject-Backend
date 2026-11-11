// import mongoose w stores it fi variable bech nesta3mlou functions mte3ou fi project
const mongoose = require("mongoose");
// Na3mlou function bech nconnectiw 3ala MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Nconnectiw 3ala database b lien eli fi .env

        console.log("MongoDB connectée avec succès"); // t5arjelna message y9olna eli connexion naj7et
    } catch (error) {
        console.error("Erreur de connexion MongoDB :", error.message); // Ken fama erreur, ya3mel affichage l message hedha
        process.exit(1); // Nwa9fou l application ken connexion manaj7etch
    }
};
// Nexportiw el function bech nesta3mlouha fi server.js
module.exports = connectDB;