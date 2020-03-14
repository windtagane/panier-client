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
 * @request GET
 * @controller list
 * Detail d'un article
 * 
 */
router.get('/detail/:id', controller.detail);

/**
 * @request GET
 * @controller add
 * Afficher le formulaire de creation d'un article
 */
router.get('/add', controller.add);

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
 * Affiche la page pour éditer un article grâce à son id
 */
router.get('/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un article grâce à son id
 */
router.post('/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un article grâce à son id
 */
router.get('/delete/:id', controller.delete);

router.get('/jsonList', controller.jsonList);


module.exports = router;
