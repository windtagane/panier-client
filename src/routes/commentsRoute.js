const router = require("express").Router();

let controller = require("../controllers/commentsController");

/**
 * @request GET
 * @controller list
 * Liste tout les commentaires d'un produit
 * 
 */
router.get('/comments/:acticleId', controller.list);

/**
 * @request POST
 * @controller create
 * Crée un nouveau commentaires sur un produit
 */
router.post('/comments/:articleId/create', controller.create);

/**
 * @request GET
 * @controller edit
 * @param - id: number
 * Affiche la page pour éditer un commentaire grâce à son id
 */
router.get('/comments/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un commentaire grâce à son id
 */
router.put('/comments/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un commentaire grâce à son id
 */
router.delete('/comments/delete/:id', controller.delete);


module.exports = router;
