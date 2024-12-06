// 1. Création de la base de données et de la collection
use reseauSocialDB;
db.createCollection("publications");

// 2. Insertion de 10 documents dans la collection
db.publications.insertMany([
    {
        publication_id: 1, utilisateur_id: 101, contenu: "Publication 1",
        "mentions_j’aime": [201, 202, 203],
        commentaires: [
            { utilisateur_id: 301, texte: "Super!", date_commentaire: new Date("2024-11-25") },
            { utilisateur_id: 302, texte: "Pas mal!", date_commentaire: new Date("2024-11-20") }
        ]
    },
    {
        publication_id: 2, utilisateur_id: 102, contenu: "Publication 2",
        "mentions_j’aime": [202, 203],
        commentaires: [
            { utilisateur_id: 303, texte: "Génial!", date_commentaire: new Date("2024-11-18") }
        ]
    },
    // Ajoutez 8 autres publications similaires
]);

// 3. Récupérer les publications ayant des commentaires d’un utilisateur spécifique
db.publications.find({ "commentaires.utilisateur_id": 301 });

// 4. Récupérer les publications ayant plus de 50 mentions "J’aime"
db.publications.find({ "mentions_j’aime": { $size: { $gt: 50 } } });

// 5. Récupérer les publications ayant un commentaire datant de plus de 7 jours
db.publications.find({ "commentaires.date_commentaire": { $lt: new Date(new Date() - 7 * 24 * 60 * 60 * 1000) } });

// 6. Compter le nombre total de commentaires pour chaque publication
db.publications.aggregate([
    { $project: { publication_id: 1, total_commentaires: { $size: "$commentaires" } } }
]);

// 7. Récupérer les 5 publications ayant le plus de mentions "J’aime", triées par ordre décroissant
db.publications.find().sort({ "mentions_j’aime": -1 }).limit(5);

// 8. Ajouter une mention "J’aime" pour un utilisateur spécifique s’il ne l’a pas encore fait
db.publications.updateMany(
    { "mentions_j’aime": { $ne: 305 } },
    { $push: { "mentions_j’aime": 305 } }
);

// 9. Supprimer tous les commentaires d’un utilisateur spécifique
db.publications.updateMany(
    {},
    { $pull: { commentaires: { utilisateur_id: 301 } } }
);

// 10. Supprimer toutes les publications sans aucune mention "J’aime"
db.publications.deleteMany({ "mentions_j’aime": { $size: 0 } });
