const router = require("express").Router();

let controller = require("../controllers/categoriesArticlesController");

/**
 * @request GET
 * @controller list
 * Liste tout les articles
 * 
 */
router.get('/categories/articles', controller.list);

/**
 * @request POST
 * @controller create
 * Crée un nouvel article
 */
router.post('/categories/articles/create', controller.create);

/**
 * @request GET
 * @controller edit
 * @param - id: number
 * Affiche la page pour éditer un article grâce à son id
 */
router.get('/categories/articles/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un article grâce à son id
 */
router.put('/categories/articles/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un article grâce à son id
 */
router.delete('/categories/articles/delete/:id', controller.delete);


module.exports = router;
