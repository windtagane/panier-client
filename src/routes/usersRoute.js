const router = require("express").Router();

let controller = require("../controllers/usersController");

/**
 * @request GET
 * @controller list
 * Liste tout les utilisateurs
 * 
 */
router.get('/', controller.list);

/**
 * @request POST
 * @controller create
 * Crée un nouvel utilisateur
 */
router.post('/create', controller.create);

/**
 * @request GET
 * @controller edit
 * @param - id: number
 * Affiche la page pour éditer un utilisateur grâce à son id
 */
router.get('/edit/:id', controller.edit);

/**
 * @request PUT
 * @controller update
 * @param - id: number
 * Met à jour un uilisateur grâce à son id
 */
router.post('/update/:id', controller.update);

/**
 * @request DELETE
 * @controller delete
 * @param - id: number
 * Supprime un utilisateur grâce à son id
 */
router.get('/delete/:id', controller.delete);


module.exports = router;
