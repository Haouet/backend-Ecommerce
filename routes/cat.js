var express = require('express');
var router = express.Router();
var catCtl = require('../controllers/cat');

/* GET persons listing. */
router.get('/',catCtl.getAllCat);
router.get('/:id',catCtl.getByid);
/* GET person by id. */
router.get('/name/:name',catCtl.getByName);
// router.get('/:id',personCtl.getPerson);
// /* GET user listing. 
// :3000/persons/add */
// router.post('/add',catCtl.addCat);
router.post('/addall',catCtl.addManyCat);
// //Add All persons :3000/persons/addall
// router.post('/addall',personCtl.addAll);
// //Find One
// // router.get('/findone',personCtl.findOne);
// // /* Remove person listing. */
// router.delete('/:id',productCtl.deleteProduct);
// // /* Update person listing. */
// router.put('/:id',productCtl.updateProduct);
// router.delete('/removeMany/:name',personCtl.deleteManyPersons);

module.exports = router;
