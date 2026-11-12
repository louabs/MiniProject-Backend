const express = require("express"); // Imports Express bech nasn3ou API routes

const router = express.Router(); // Creates a router bech nadhmou authentication routes

const { register } = require("../controllers/authController"); // Imports register  functions

// Route to register user jdid
router.post("/register", register);


// Exports the router bech nesma3louha fi server.js
module.exports = router;