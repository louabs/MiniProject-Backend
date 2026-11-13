// Checks role mta3 user
const roleMiddleware = (roles) => {
    return (req, res, next) => {

        // Checks eli user is authenticated
        if (!req.user) {
            return res.status(401).json({
                message: "Utilisateur non authentifié"
            });
        }

        // Checks eli role mta3 user is allowed
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Accès interdit"
            });
        }
        
        // ken role correct,yet3ada l route jeya
        next();
    };
};

module.exports = roleMiddleware; // Exports  role middleware bech nesta3louha fi files o5rina