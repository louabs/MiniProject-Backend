
const mongoose = require("mongoose");

// Defines structure mta3 User fi  MongoDB database
const userSchema = new mongoose.Schema({

    // Stores esem user 
    nom: {
        type: String,
        required: true
    },

    // Stores login unique mta3 user
    login: {
        type: String,
        required: true,
        unique: true
    },

    // Stores password mta3 user eli bech nraj3ouh crypté
    password: {
        type: String,
        required: true
    },

    // Defines role mta3 user eli mayajem ikoun ya manager ya user
    role: {
        type: String,
        enum: ["user", "manager"],
        default: "user"
    },

    // t9ayadlek date mta3 creation du compte automatiquement
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

// Exports  User model bech najmou nesta3louh in files o5rina
module.exports = mongoose.model("User", userSchema);
