const router = require("express").Router();

let controller = require("../controllers/productsController");

/**
 * @request GET
 * @controller list
 * Liste tout les produits
 * 
 */
router.get('/products', controller.list);

/**
 * @request POST
 * @controller create
 * Crée un nouveau produit
 */
router.post('products/create', controller.create);

/**
 * @request GET
 * @controller edit
 * @param - id: number
 * Affiche la page pour éditer un produit grâce à son id
 */
router.get('/products/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un produit grâce à son id
 */
router.put('/products/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un produit grâce à son id
 */
router.delete('/products/delete/:id', controller.delete);


module.exports = router;
