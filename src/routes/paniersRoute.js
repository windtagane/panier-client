const router = require("express").Router();

let controller = require("../controllers/paniersController");

/**
 * @request GET
 * @controller list
 * Liste tout les paniers
 * 
 */
router.get('/', controller.list);

/**
 * @request GET
 * @controller show
 * Le panier en cours non validé par l'untilisateur
 * 
 */
router.get('/:id', controller.show);

/**
 * @request POST
 * @controller create
 * Crée un nouveau panier
 */
router.post('/create', controller.create);

/**
 * @request GET
 * @controller edit
 * @param - id: number
 * Affiche la page pour éditer un produit grâce à son id
 */
router.get('/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un panier grâce à son id
 */
router.put('/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un panier grâce à son id
 */
router.delete('/delete/:id', controller.delete);


/**
 * @request POST
 * @controller addToPanier
 * @param - id: number; idArticle: number
 * Ajoute un article au panier de l'utilisateur
 */
router.post('/:id/addToPanier/:idArticle', controller.addToPanier);

/**
 * @request POST
 * @controller removeToPanier
 * @param - id: number; idArticle: number
 * Enleve un article au panier de l'utilisateur
 */
router.post('/:id/removeToPanier/:idArticle', controller.removeToPanier);

/**
 * @request POST
 * @controller editQuantity
 * @param - id: number; idArticle: number
 * Modifie la quantité d'un article dans le panier de l'utilisateur
 */
router.post('/:id/quantite/:idArticle', controller.editArticleQuantity);

module.exports = router;
