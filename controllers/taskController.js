
// importation lil models
const Task = require("../models/Task");
const Project = require("../models/Project");
const User = require("../models/User");
const mongoose = require("mongoose");


// Fonction mta3 creation d'un task
const createTask = async (req, res) => {
    try {

        // Na9raw les données jeyin men request body
        const {
            titre,
            description,
            statut,
            deadline,
            projet,
            utilisateurAssigne
        } = req.body;


        // Nethabtou eli titre mawjoud w mahouch feragh
        if (typeof titre !== "string" || !titre.trim()) {
            return res.status(400).json({
                message: "Le titre de la tâche est obligatoire"
            });
        }


        // Nethabtou eli identifiant mta3 projet valide
        if (!projet || !mongoose.Types.ObjectId.isValid(projet)) {
            return res.status(400).json({
                message: "Identifiant du projet invalide"
            });
        }


        // Nlawjou 3al projet fi MongoDB
        const project = await Project.findById(projet);

        if (!project) {
            return res.status(404).json({
                message: "Projet introuvable"
            });
        }


        // kan le manager ynajem  ya3mil affectation li task
        if (
            req.user.role !== "manager" &&
            utilisateurAssigne !== undefined &&
            utilisateurAssigne !== null
        ) {
            return res.status(403).json({
                message: "Seul le manager peut affecter une tâche"
            });
        }


        // Ken el manager 5tar user, nethabtou eli user mawjoud
        if (utilisateurAssigne) {

            if (!mongoose.Types.ObjectId.isValid(utilisateurAssigne)) {
                return res.status(400).json({
                    message: "Identifiant utilisateur invalide"
                });
            }

            const user = await User.findById(utilisateurAssigne);

            if (!user) {
                return res.status(404).json({
                    message: "Utilisateur introuvable"
                });
            }
        }


        // Creation mta3 task
        const task = await Task.create({
            titre: titre.trim(),
            description,
            statut,
            deadline,
            projet,
            utilisateurAssigne: req.user.role === "manager"
                ? utilisateurAssigne || null
                : null
        });


        res.status(201).json({
            message: "Tâche créée avec succès",
            task
        });


    } catch (error) {

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Données de la tâche invalides",
                error: error.message
            });
        }

        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });
    }
};




 
 // Fonction bach naamlou recuperation lil tasks avec recherche et filtering
const getTasks = async (req, res) => {
    try {

        // Njibou les paramètres men URL
        const { search, statut, projet, utilisateurAssigne } = req.query;

        let filtre = {};

        // Manager ynajem ychouf les tasks lkol
        // User ychouf ken les tasks affectés lih
        if (req.user.role !== "manager") {
            filtre.utilisateurAssigne = req.user.id;
        }

        // Filtering selon statut
        if (statut) {

            const statutsAutorises = ["todo", "doing", "done"];

            // Nethabtou eli statut valide
            if (!statutsAutorises.includes(statut)) {
                return res.status(400).json({
                    message: "Statut invalide",
                    statutsAutorises
                });
            }

            filtre.statut = statut;
        }

        // Filtering selon projet
        if (projet) {

            // Nethabtou men identifiant projet
            if (!mongoose.Types.ObjectId.isValid(projet)) {
                return res.status(400).json({
                    message: "Identifiant du projet invalide"
                });
            }

            filtre.projet = projet;
        }

        // Filtering selon utilisateur affecté
        if (utilisateurAssigne) {

            // Ken user, ma ynajemch yfiltri les tâches mta3 les autres
            if (req.user.role !== "manager") {
                return res.status(403).json({
                    message: "Seul le manager peut filtrer par utilisateur"
                });
            }

            // Nethabtou men identifiant utilisateur
            if (!mongoose.Types.ObjectId.isValid(utilisateurAssigne)) {
                return res.status(400).json({
                    message: "Identifiant utilisateur invalide"
                });
            }

            filtre.utilisateurAssigne = utilisateurAssigne;
        }

        // Recherche selon titre ou description
        if (search && search.trim()) {

            // "i" ma3neha recherche ma tfara9ch bin majuscule w minuscule
            const motRecherche = new RegExp(
                search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
                "i"
            );

            // Nlawjou 3al mot recherché fi titre wala description
            filtre.$or = [
                { titre: motRecherche },
                { description: motRecherche }
            ];
        }

        // Nrecuperiw les tasks selon les filtres
        const tasks = await Task.find(filtre)

            // Affichage des informations mta3 projet associé
            .populate("projet", "nom proprietaire")

            // Affichage des informations mta3 utilisateur affecté
            .populate("utilisateurAssigne", "nom login")

            .sort({ dateCreation: -1 });

        // Nraj3ou resultat lel client
        res.status(200).json({
            message: "Liste des tâches récupérée avec succès",
            tasks
        });

    } catch (error) {

        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });

    }
};


// Fonction bach naamlou affectation lil task
const assignTask = async (req, res) => {
    try {

        // Nethabtou eli ken Manager ynajem ya3mel affectation
        if (req.user.role !== "manager") {
            return res.status(403).json({
                message: "Seul le manager peut affecter une tâche"
            });
        }

        // Na9raw les données
        const { utilisateurAssigne } = req.body;

        const { id } = req.params;

        // Nethabtou men identifiant task
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Identifiant de la tâche invalide"
            });
        }

        // Nlawjou 3al task
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Tâche introuvable"
            });
        }

        // Nethabtou men identifiant user
        if (!utilisateurAssigne ||
            !mongoose.Types.ObjectId.isValid(utilisateurAssigne)) {
            return res.status(400).json({
                message: "Identifiant utilisateur invalide"
            });
        }

        // Nlawjou 3al user
        const user = await User.findById(utilisateurAssigne);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable"
            });
        }

        // Affectation de la tâche
        task.utilisateurAssigne = utilisateurAssigne;

        await task.save();

        res.status(200).json({
            message: "Tâche affectée avec succès",
            task
        });

    } catch (error) {

        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });

    }
};

// Fonction bach naamlou modification lil task
const updateTask = async (req, res) => {
    try {

        // Na9raw identifiant task
        const { id } = req.params;

        // Nethabtou men identifiant
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Identifiant de la tâche invalide"
            });
        }

        // Nlawjou 3al task
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Tâche introuvable"
            });
        }

        // Nethabtou men les permissions
        if (
            req.user.role !== "manager" &&
            task.utilisateurAssigne?.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Vous n'avez pas le droit de modifier cette tâche"
            });
        }

        // L'affectation tet3amel ken par assignTask
        if (req.body.utilisateurAssigne !== undefined) {
            return res.status(403).json({
                message: "Utilisez la fonction d'affectation pour changer l'utilisateur"
            });
        }

        // Modification du titre
        if (req.body.titre !== undefined) {

            if (
                typeof req.body.titre !== "string" ||
                !req.body.titre.trim()
            ) {
                return res.status(400).json({
                    message: "Le titre est obligatoire"
                });
            }

            task.titre = req.body.titre.trim();
        }

        // Modification description
        if (req.body.description !== undefined) {
            task.description = req.body.description;
        }

        // Modification statut
        if (req.body.statut !== undefined) {

            const statutsAutorises = ["todo", "doing", "done"];

            if (!statutsAutorises.includes(req.body.statut)) {
                return res.status(400).json({
                    message: "Statut invalide. Les statuts autorisés sont : todo, doing, done"
                });
            }

            task.statut = req.body.statut;
        }

        // Modification deadline
        if (req.body.deadline !== undefined) {
            task.deadline = req.body.deadline;
        }

        // Modification projet
        if (req.body.projet !== undefined) {

            if (!mongoose.Types.ObjectId.isValid(req.body.projet)) {
                return res.status(400).json({
                    message: "Identifiant du projet invalide"
                });
            }

            const project = await Project.findById(req.body.projet);

            if (!project) {
                return res.status(404).json({
                    message: "Projet introuvable"
                });
            }

            task.projet = req.body.projet;
        }

        // Sauvegarde des modifications
        await task.save();

        res.status(200).json({
            message: "Tâche modifiée avec succès",
            task
        });

    } catch (error) {

        if (error.name === "ValidationError") {
            return res.status(400).json({
                message: "Données invalides",
                error: error.message
            });
        }

        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });

    }
};
// Fonction bach naamlou suppression lil task
const deleteTask = async (req, res) => {
    try {

        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Identifiant de la tâche invalide"
            });
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({
                message: "Tâche introuvable"
            });
        }

        if (
            req.user.role !== "manager" &&
            task.utilisateurAssigne?.toString() !== req.user.id
        ) {
            return res.status(403).json({
                message: "Vous n'avez pas le droit de supprimer cette tâche"
            });
        }

        // Suppression de la tâche
        await Task.findByIdAndDelete(id);

        res.status(200).json({
            message: "Tâche supprimée avec succès"
        });

    } catch (error) {

        res.status(500).json({
            message: "Erreur serveur",
            error: error.message
        });

    }
};
module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    assignTask
};
