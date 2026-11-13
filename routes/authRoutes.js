const express = require("express"); // Imports Express bech nasn3ou API routes

const router = express.Router(); // Creates a router bech nadhmou authentication routes

const { register, login } = require("../controllers/authController"); // Imports register w login functions

const authMiddleware = require("../middlewares/authMiddleware"); // Imports auth middleware bech tprotecti les routes bel JWT tokens


// Route to register user jdid
router.post("/register", register);

// Route to log in  user mawjoud deja
router.post("/login", login);

// User lezem ikoun 3andou valid JWT token 5ater Route hedhi protected
router.get("/me", authMiddleware, (req, res) => {
    res.json({
        message: "Utilisateur authentifié",
        user: req.user
    });
});


// Exports the router bech nesma3louha fi server.js
module.exports = router;