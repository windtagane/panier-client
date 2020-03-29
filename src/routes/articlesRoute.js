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
 * @request POST
 * @controller addComment
 * @param - id: number
 * Crée un nouveau commentaire sur article
 */
router.post('/comments/:id', controller.addComment);

/**
 * @request GET
 * @controller editComment
 * @param - id: number
 * Affiche le commentaire à modifier sur article
 */
router.get('/comments/edit/:idcomment/:idarticle', controller.editComment);

/**
 * @request POST
 * @controller updateComment
 * @param - id: number
 * Modifie le commentaire à selectionner sur article
 */
 router.post('/comments/update/:idcomment/:idarticle', controller.updateComment);


/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un commantaire grâce à son id
 */
router.get('/comments/delete/:idcomment/:idarticle', controller.deleteComment);



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
router.get('/view/:id/json', controller.jsonView);
router.post('/delete/:id/json', controller.jsonDelete);


module.exports = router;
