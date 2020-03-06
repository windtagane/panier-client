const router = require("express").Router();

let controller = require("../controllers/commentsController");

/**
 * @request GET
 * @controller list
 * Liste tout les commentaires d'un produit
 * 
 */
router.get('/article/:id', controller.list);

/**
 * @request POST
 * @controller create
 * Crée un nouveau commentaires sur un produit
 */
router.post('/article/:id/create', controller.create);

/**
 * @request GET
 * @controller edit
 * @param - id: number
 * Affiche la page pour éditer un commentaire grâce à son id
 */
router.get('/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un commentaire grâce à son id
 */
router.post('/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un commentaire grâce à son id
 */
router.get('/delete/:id', controller.delete);


module.exports = router;
