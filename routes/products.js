var express = require('express');
var router = express.Router();
var productCtl = require('../controllers/products');

/* GET persons listing. */
router.get('/',productCtl.getAllProducts);
router.get('/:id',productCtl.getProductId); 
router.get('/paginate',productCtl.getAllProductsPagination);
/* Get comment  member listing. */
router.get('/cat/:id', productCtl.getProductByCat);
router.get('/category/:name', productCtl.getProductByCatName);
// :5000/product/add */
 router.post('/add',productCtl.addproduct);
// //Add All products :5000/product/addall
router.post('/addall',productCtl.addManyProducts); 
// //Find One
// // router.get('/findone',personCtl.findOne);
// // /* Remove person listing. */
// router.delete('/:id',productCtl.deleteProduct);
// // /* Update person listing. */
 router.put('/:id',productCtl.updateProduct);
// router.delete('/removeMany/:name',personCtl.deleteManyPersons);
router.delete("/", productCtl.isVisibleProduct); 
/* Delete Product by id listing. */
router.delete("/:id", productCtl.deleteProduct); 
module.exports = router;
