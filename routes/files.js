var express = require("express");
var router = express.Router();
var fileCtrl = require("../controllers/file");
const multer = require('../middlewares/multer-config');
router.post("/addMultiple",multer.array('files'), fileCtrl.addMultipleFile);
router.post("/add",multer.single('file'), fileCtrl.addFile);
router.get("/",  fileCtrl.getFiles);

module.exports = router;
