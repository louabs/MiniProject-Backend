
const express = require("express");
const router = express.Router();

// Importation des fonctions du projectController
const {
    createProject,
    getProjects,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

// Importation du middleware d'authentification
const authMiddleware = require("../middlewares/authMiddleware");

// nrecuperiw les projets  ily accessibles lil user
router.get("/", authMiddleware, getProjects);

// route bach na3mlou creation li projet
router.post("/", authMiddleware, createProject);

//  route bach na3mlou Modification li projet
router.put("/:id", authMiddleware, updateProject);

// route bach nfas5ou projet
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
