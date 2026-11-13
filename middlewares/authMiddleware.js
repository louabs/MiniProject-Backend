const jwt = require("jsonwebtoken"); // Imports the jsonwebtoken library bech tverifi w manage authentication tokens

// Checks  token eli b3athha user
const authMiddleware = (req, res, next) => {
    try {
        // Gets header mta3 Authorization 
        const authHeader = req.headers.authorization;

        // Checks eli token existe deja wala lee
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Token manquant"
            });
        }

        // Removes the word Bearer  w t5ali ken  token
        const token = authHeader.split(" ")[1];

        // Verifies eli token valide
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Stores infos mta3 user bech testa3malhoum fi routes
        req.user = decoded;

        // Continues l route eli ba3dha 
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token invalide ou expiré"
        });
    }
};

module.exports = authMiddleware; // Exports authentication middleware bech najmou nesta3mlouhoum fi files o5rina