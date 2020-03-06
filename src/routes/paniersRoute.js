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
 * @request POST
 * @controller create
 * Crée un nouveau panier
 */
router.post('/create/:utilisateurId', controller.create);

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
 * Met à jour un produit grâce à son id
 */
router.put('/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un produit grâce à son id
 */
router.delete('/delete/:id', controller.delete);


/**
 * @request POST
 * @controller addToPanier
 * @param - id: number; idUser: number
 * Ajoute un article au panier de l'utilisateur
 */
router.post('/:id/addToPanier/:idArticle', controller.addToPanier);

module.exports = router;
