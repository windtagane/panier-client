const router = require("express").Router();

let controller = require("../controllers/indexController");

/**
 * @request GET
 * @controller index
 * Affiche la page d'acceuil
 * 
 */

router.get('/', controller.index);

/**
 * @request GET
 * @controller login
 * Affiche la page login
 * 
 */

router.get('/login',controller.login)

/**
 * @request GET
 * @controller signup
 * Affiche la page inscription
 * 
 */
router.get('/signup',controller.signup)

/**
 * @request POST
 * @controller signup
 * Inscription d'un nouveau utilisateur
 * 
 */
router.post('/signup',controller.SaveSignup)



module.exports = router;
