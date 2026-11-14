# API REST de Gestion de Projets et Tâches

## Auteurs

- Étudiante 1 : Ben Sedrine Loua
- Étudiante 2 : Ouni Fatma

## Technologies utilisées

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

##Fonctionnalités

Authentification

-Inscription et connexion des utilisateurs.

-Hachage des mots de passe avec bcryptjs.

-Authentification avec JWT.

-Gestion des rôles : user et manager.

Gestion des projets

-Création d'un projet.

-Affichage des projets.

-Modification d'un projet.

-Suppression d'un projet.

-Consultation de tous les projets par le manager.

Gestion des tâches

-Création d'une tâche associée à un projet.

-Affichage des tâches.

-Modification d'une tâche.

-Suppression d'une tâche.

-Affectation des tâches par le manager.

-Gestion des statuts : todo, doing et done.

Règles de gestion

-Tout utilisateur authentifié peut créer un projet.

-Seul le manager peut consulter tous les projets.

-Chaque tâche est associée à un projet.

-Tout utilisateur authentifié peut créer une tâche.

-Un utilisateur peut consulter uniquement ses propres tâches.

-Seul le manager peut affecter une tâche à un utilisateur.

-Le statut d'une tâche doit être : todo, doing ou done.

##Tests

Les différentes fonctionnalités de l'API ont été testées avec Postman, notamment l'authentification, la gestion des projets, la gestion des tâches et les autorisations selon les rôles.
