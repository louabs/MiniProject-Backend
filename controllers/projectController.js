
const Project = require("../models/Project"); // na3mlou importation li model projet 

// Fonction bech naamlou creation d'un projet
const createProject = async (req, res) => { // async ma3neha la fonction tista3mil await 5tr ecriture ta5ou barcha wa9t , req hia les données jeyin mil client w res hia el reponse ily yab3atha el sever
    try {

        const { nom, description, statut } = req.body; // Njibou les informations mta3 projet men request body

        if (!nom || !nom.trim()) {    // Nethabtou eli esm projet mawjoud
            return res.status(400).json({
                message: "Le nom du projet est obligatoire"
            });
        }

        const project = await Project.create({  // Na3mlou creation mta3 projet jdid fi MongoDB
            nom,
            description,
            statut,
            proprietaire: req.user.id // yorbit el projet bil utilisateur connecté automatiquement 
        });

        res.status(201).json({   // Nraj3ou resultat lel utilisateur
            message: "Projet créé avec succès",
            project
        });

    } catch (error) {

        if (error.name === "ValidationError") { // Teb3a les erreurs de validation  mta3 MongoDB
            return res.status(400).json({
                message: "Données du projet invalides",
                error: error.message
            });
        }
        
        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }

    }
    



// Fonction bach na3mlou recuperation lil projet 
const getProjects = async (req, res) => {
    try {

        let projects; // variabale nal9aw fiha les projets recupérés min mongodb

         
        if (req.user.role === "manager") { // nthabtou est ce que user el connecté houa manager

            projects = await Project.find()  // ken ey tsir recuperation li tous les projects
                .populate("proprietaire", "nom login");

        } else {

            projects = await Project.find({  // sinon yrecuperi ken el project correspondant lil user htathaka 
                proprietaire: req.user.id
            }).populate("proprietaire", "nom login");

        }

        res.status(200).json({
            message: "Liste des projets récupérée avec succès", // nraj3ou les projects lil user bil statut HTTP 200 (OK)
            projects
        });

    } catch (error) {

        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });

    }
};




// Fonction bech naamlou modification d'un projet
const updateProject = async (req, res) => {
    try {

        const { nom, description, statut } = req.body;  // Njibou les informations mta3 projet men request body


        const project = await Project.findById(req.params.id); // Nal9aw el projet eli nhebou naamloulou modification bil find


        if (!project) {
            return res.status(404).json({
                message: "Projet introuvable"  // ken mafama hata projet bil identifiant ily hatineh on repond 404
            });
        }


        if (
            req.user.role !== "manager" &&       // ken el user mahouch manager 
            project.proprietaire.toString() !== req.user.id   //ken mahouch el proprietaire de projet . w lazem to.string 5tr project.proprietaire est un ObjectI w que req.user.id est une chaîne de caractères
        ) {
            return res.status(403).json({
                message: "Accès refusé : vous ne pouvez pas modifier ce projet"
            });
        }

        if (nom !== undefined && !nom.trim()) {  // Nethabtou eli nom projet mahouch vide 

            return res.status(400).json({
                message: "Le nom du projet ne peut pas être vide"
            });
        }

        if (           // Nethabtou statut parmi les valeurs autorisées
            statut !== undefined &&
            !["en cours", "terminé", "en pause"].includes(statut)
        ) {
            return res.status(400).json({
                message: "Statut invalide"
            });
        }
        // na3mlou ken les modifications envoyés
        if (nom !== undefined) project.nom = nom;           
        if (description !== undefined) project.description = description;
        if (statut !== undefined) project.statut = statut;

        await project.save();      // Nsajlou les modifications fi MongoDB


        res.status(200).json({
            message: "Projet modifié avec succès",
            project
        });

    } catch (error) {

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Données du projet invalides",
                error: error.message
            });
        }

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Identifiant du projet invalide"
            });
        }

        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });

    }
};




// Fonction bech naamlou suppression d'un projet
const deleteProject = async (req, res) => {
    try {

        const project = await Project.findById(req.params.id);     // req.params y5alik trécupéri  les paramètres el mawjoudin fi l'URL de la requête HTTP.


        if (!project) {  // nthabtou est ce que projet existe fi mongodb
            return res.status(404).json({
                message: "Projet introuvable"
            });
        }

       
        // Ken user, ynajem yfasakh ken projet mte3ou
        // Manager ynajem yfasakh les projets lkol

        if (
            req.user.role !== "manager" &&   // ken el user mahouch manager 
            project.proprietaire.toString() !== req.user.id // ken el user mahouch el proprietaire de projet
        ) {
            return res.status(403).json({
                message: "Accès refusé : vous ne pouvez pas supprimer ce projet"
            });
        }

        await project.deleteOne();       // Nfas5ou el projet men MongoDB


        res.status(200).json({
            message: "Projet supprimé avec succès"
        });

    } catch (error) {

        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Identifiant du projet invalide"
            });
        }

        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });

    }
};


module.exports = {  // na3mlou exportation lil les fonctions bech nestaamlouha fi routes
    createProject,
    getProjects,
    updateProject,
    deleteProject
};
