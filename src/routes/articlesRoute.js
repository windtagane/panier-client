const router = require("express").Router();

let controller = require("../controllers/articlesController");

/**
 * @request GET
 * @controller list
 * Liste tout les articles
 * 
 */
router.get('/', controller.list);

/**
 * @request POST
 * @controller create
 * Crée un nouvel article
 */
router.post('/articles/create', controller.create);

/**
 * @request GET
 * @controller edit
 * @param - id: number
 * Affiche la page pour éditer un article grâce à son id
 */
router.get('/articles/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un article grâce à son id
 */
router.put('/articles/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un article grâce à son id
 */
router.delete('/articles/delete/:id', controller.delete);

/**
 * @request POST
 * @controller addToPanier
 * @param - id: number; idUser: number
 * Ajoute un article au panier de l'utilisateur
 */
router.post('/articles/:id/addToPanier/:idUser', controller.addToPanier);

/**
 * @request GET
 * @controller details
 * @param - idArticle: number
 * Voir détail article
 */
router.get('/details', controller.details);


module.exports = router;