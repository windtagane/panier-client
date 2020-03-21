const router = require("express").Router();

let controller = require("../controllers/adminController");

router.get('/', controller.index);
router.get('/stats', controller.stats)

module.exports = router;