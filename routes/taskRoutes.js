
const express = require("express");

const router = express.Router();

//  na3mlou Importation lil fonctions mta3 Task Controller
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    assignTask
} = require("../controllers/taskController");

// Importation des middlewares
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

//  les routes el kol sont protégées bil JWT

router.get("/", authMiddleware, getTasks); // Route bach nchoufou  les tasks


router.post("/", authMiddleware, createTask); // Route bach na3mlou création li task


router.put("/:id", authMiddleware, updateTask); // Route bach na3mlou modification li task



router.delete("/:id", authMiddleware, deleteTask); // Route bch nfas5ou  task

// Route pour affecter une tâche (Manager khw)

router.put(
    "/:id/assign",
    authMiddleware,
    roleMiddleware(["manager"]),
    assignTask
);

// Exportation du router
module.exports = router;
