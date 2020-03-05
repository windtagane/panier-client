const router = require("express").Router();

let controller = require("../controllers/adminController");

router.get('/', controller.index);

module.exports = router;