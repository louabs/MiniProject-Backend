const express = require("express"); // Imports Express bech nasn3ou API routes

const router = express.Router(); // Creates a router bech nadhmou authentication routes

const { register, login } = require("../controllers/authController"); // Imports register w login functions

// Route to register user jdid
router.post("/register", register);

// Route to log in  user mawjoud deja
router.post("/login", login);

// Exports the router bech nesma3louha fi server.js
module.exports = router;