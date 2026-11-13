const express = require("express"); // Imports Express bech nasn3ou API routes

const router = express.Router(); // Creates a router bech nadhmou authentication routes

const { register, login } = require("../controllers/authController"); // Imports register w login functions

const authMiddleware = require("../middlewares/authMiddleware"); // Imports auth middleware bech tprotecti les routes bel JWT tokens

const roleMiddleware = require("../middlewares/roleMiddleware"); // Imports role middleware bech tverify user permissions

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
// User eli 3andou role manager barka 3andou ha9 yod5lou fi route hedhi
router.get(
    "/manager-test",
    authMiddleware,
    roleMiddleware(["manager"]),
    (req, res) => {
        res.json({
            message: "Bienvenue manager"
        });
    }
);

// Exports the router bech nesma3louha fi server.js
module.exports = router;