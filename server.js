const express = require("express"); // Imports Express bech na5l9ou  backend server w API

const dotenv = require("dotenv"); // Imports dotenv bech ta9ra environment variables men fichier .env 

const connectDB = require("./config/db");// Imports l function responsible 3ala connecting to MongoDB

const authRoutes = require("./routes/authRoutes"); // Imports authentication routes

dotenv.config(); // Loads environment variables men fichier .env 

const app = express(); // tasna3  Express application

app.use(express.json()); // t5ali  API  yreceive w process JSON data

app.use("/api/auth", authRoutes); // Connects authentication routes l API

connectDB(); // Establishes connection l the MongoDB database

const PORT = process.env.PORT || 3000; // Defines  server port b the environment variable wala 3000 by default

// Starts the server w ta3mel affichage l message wa9teli y5dem
app.listen(PORT, () => { 
    console.log(`Serveur démarré sur le port ${PORT}`);
});