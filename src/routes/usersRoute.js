const router = require("express").Router();

let controller = require("../controllers/usersController");

/**
 * @request GET
 * @controller list
 * Liste tout les utilisateurs
 * 
 */
router.get('/users', controller.list);

/**
 * @request POST
 * @controller create
 * Crée un nouvel utilisateur
 */
router.post('users/create', controller.create);

/**
 * @request GET
 * @controller edit
 * @param - id: number
 * Affiche la page pour éditer un utilisateur grâce à son id
 */
router.get('/users/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un uilisateur grâce à son id
 */
router.put('/users/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un utilisateur grâce à son id
 */
router.delete('/users/delete/:id', controller.delete);


module.exports = router;
