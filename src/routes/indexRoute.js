const router = require("express").Router();

let controller = require("../controllers/indexController");

/**
 * @request GET
 * @controller index
 * Affiche la page d'acceuil
 * 
 */
router.get('/', controller.index);

module.exports = router;
