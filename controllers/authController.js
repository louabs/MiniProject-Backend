
const User = require("../models/User"); // Imports User model bech yinteract m3a les utilisateurs fi MongoDB

const bcrypt = require("bcryptjs"); // Imports bcryptjs bech ncryptiw les mots de passe w n9arnou binethoum wa9t el login


// Registers a new user
const register = async (req, res) => {
    try {
        const { nom, login, password } = req.body;

        // Checks eli les champs obligatoire lkoul mawjoudin
        if (!nom || !login || !password) {
            return res.status(400).json({
                message: "Nom, login et password sont obligatoires"
            });
        }

        // Checks eli login mawjoud deja wala lee
        const existingUser = await User.findOne({ login });

        if (existingUser) {
            return res.status(400).json({
                message: "Ce login existe déjà"
            });
        }

        // Hashes l password 3bal mata3malou save fi  database
        const hashedPassword = await bcrypt.hash(password, 10);

        // tasna3lek new user bel role fi choix par defaut
        const user = await User.create({
            nom,
            login,
            password: hashedPassword
        });

        // traja3lek information mta3 user eli sna3neh men ghir password mte3ou 
        res.status(201).json({
            message: "Utilisateur créé avec succès",
            user: {
                id: user._id,
                nom: user.nom,
                login: user.login,
                role: user.role
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};


// Authenticates user qui existe deja
const login = async (req, res) => {
    try {
        const { login, password } = req.body;

        // Checks eli login and password  mawjoudin
        if (!login || !password) {
            return res.status(400).json({
                message: "Login et password sont obligatoires"
            });
        }

        // Searches 3ala user b login mte3ou
        const user = await User.findOne({ login });

        if (!user) {
            return res.status(401).json({
                message: "Login ou password incorrect"
            });
        }

        // Compares bin password eli ktebou user w stored hashed password
        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Login ou password incorrect"
            });
        }

        // Generates a JWT authentication token
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Returns the authentication token
        res.json({
            message: "Connexion réussie",
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};

// Exports authentication functions bech nesta3mlouhoum fi routes
module.exports = {
    register
};
