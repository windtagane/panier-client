const router = require("express").Router();

let controller = require("../controllers/categoriesArticlesController");

/**
 * @request GET
 * @controller list
 * Liste toute les catégories
 * 
 */
router.get('/', controller.list);

/**
 * @request GET
 * @controller add
 * Affiche le formulaire de creation
 */
router.get('/add', controller.add);

/**
 * @request GET
 * @controller list
 * Liste tout les articles d'une catégorie
 * 
 */
router.get('/view/:id', controller.view);

/**
 * @request POST
 * @controller create
 * Crée un nouvel article
 */
router.post('/create', controller.create);

/**
 * @request GET
 * @controller edit
 * @param - id: number
 * Affiche la page pour éditer un catégorie grâce à son id
 */
router.get('/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un catégorie grâce à son id
 */
router.post('/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un catégorie grâce à son id
 */
router.get('/delete/:id', controller.delete);

router.get('/jsonList', controller.jsonList);
router.get('/view/:id/json', controller.jsonView);
router.post('/delete/:id/json', controller.jsonDelete);


module.exports = router;
