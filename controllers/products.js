var Product = require("../models/products")
var Category = require("../models/category")

exports.getAllProducts = (req, res, next) => {
    Product.find()
      .then((data) => {
        return res
          .status(200)
          .json({ success: true, Products: data.length, data: data });
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({ err: err });
      });
  };

exports.addManyProducts = async (req, res, next) => {
    Product.insertMany(req.body.products).then(function () {
      return res.status(201).json({ success: true, msg: 'Successful created multiple products' });  //creation successfull
  }).catch(function (error) {
      return res.status(401).json({ success: true, msg: 'product existt', error: error });  //creation successfull
  });
  };
exports.addproduct = async (req, res, next) => {
  await Category.findOne({
    name: req.body.category,
  })
    .then((data) => {
      if (data) {
        var produit = new Product({ ...req.body, category: data.id });
        produit
          .save()
          .then((result) => {
            return res.status(201).json({
              success: true,
              msg: "Successful created new User",
              data: result,
            });
          })
          .catch((error) => {
            console.error(error);
            return res.status(403).json({ err: error });
          });
      }
      // create address, then create user with the id of created address
      else {
        var category = new Category(req.body.category);
        category 
          .save()
          .then((data) => {
            var produit = new Product({ ...req.body, category : data._id });
            produit
              .save()
              .then((result) => {
                return res.status(201).json({
                  success: true,
                  msg: "Successful created new Product",
                  data: result,
                });
              })
              .catch((error) => {
                console.error(error);
                return res.status(403).json({ err: error });
              });
          })
          .catch((err) => {
            console.error(err);
            return res.status(403).json({ err: err });
          });      }
    })
    .catch((err) => {
      console.error(err);
      return res.status(403).json({ err: err });
    });
//   const product = new Product({
//     title: req.body.title,
//     description: req.body.name,
//     price : req.body.price,
//     rating: req.body.rating,
//     stock: req.body.stock,
//     brand : req.body.brand,
//     category: req.body.category,
//     stock: req.body.stock,
//     thumbnail : req.body.thumbnail,
//     images : req.body.images,
//     discountPercentage : req.body.discountPercentage
//    });
// await product.save().then(data => {
//       return res.status(201).json({ success: true, msg: 'Successful created new Product', data:data });  //creation successfull
//     }).catch(err => {
//       return res.status(403).json({ err: err });
//     });
//     next();
};

exports.getProductByCat = async(req,res,next) =>{
  
      const foundCategory = await Category.findOne({ _id: req.params.id });
     await Product.find({ category: foundCategory.id })
     .then(data => {
            return res.status(201).json({ success: true, msg: 'Successful created new Product', data:data });  //creation successfull
          }).catch(err => {
            return res.status(403).json({ err: err });
          });

}

exports.getProductByCatName = async(req,res,next) =>{

  const foundCategory = await Category.findOne({ name: req.params.name });
  console.log(foundCategory);
  console.log(foundCategory.name);
  const nameCat = foundCategory.name;
  console.log(nameCat);
 
 const findProduct = await Product.find({ category: foundCategory._id  });
 console.log(findProduct);
 res.json(findProduct);
//  .then(data => {
  
//         return res.status(201).json({ success: true, msg: 'Successful created new Product', data:data });  //creation successfull
//       }).catch(err => {
//         return res.status(403).json({ err: err });
//       });

}
exports.getProductId= (req, res, next) => {
  req.query.populate === "category"
    ? Product.findById(req.params.id)
        .populate("category")
        .then((data) => {
          data
            ? res.status(200).json({ success: true, data: data })
            : res.status(404).json({ success: false, data: "No product Found" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(403).json({ err: err });
        })
    : Product.findById(req.params.id)
        .then((data) => {
          data
            ? res.status(200).json({ success: true, data: data })
            : res.status(404).json({ success: false, data: "No product Found" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(403).json({ err: err });
        });
};
exports.updateProduct = async (req, res, next) => {
    await Category.find({
      name: req.body.category,
    })
      .then((data) => {
        Product.findByIdAndUpdate(req.params.id, {
          ...req.body,
          category: data._id,
        })
          .then((result) => {
            return res.status(200).json({ success: true, data: result });
          })
          .catch((error) => {
            console.error(error);
            return res.status(404).json({ err: error });
          });
      })
      .catch((err) => {
        console.error(err);
        return res.status(404).json({ err: "No product Found" });
      });
  };
  // get products with pagination
exports.getAllProductsPagination = async (req, res) => {
  var pageNo = parseInt(req.query.pageNo)
  var size = parseInt(req.query.size)
  var query = {}
  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size
  // Find some documents
  Product.count({}, function (err, totalCount) {
    if (err) {
      response = { "error": true, "message": "Error fetching data" }
    }
    Product.find({}, {}, query, function (err, data) {
      // Mongo command to fetch all data from collection.
      if (err) {
        response = { "error": true, "message": "Error fetching data" };
      } else {
        var totalPages = Math.ceil(totalCount / size)
        response = { "error": false, "message": data, "pages": totalPages, "total": totalCount, "pageIndex": pageNo };
      }
      res.json(response);
    })
  })
}

// delete Product mise à jour isVisible à true
exports.isVisibleProduct = async (req, res, next) => {
  const { _id } = req.body
  const newProduct = await Product.findByIdAndUpdate(_id,
    {
      isVisible: false
    }, { new: true });
  res.send(newProduct);
  // console.log(name);
  next();
}
exports.deleteProduct = async (req, res, next) => {
 Product.findOneAndDelete({ _id: req.params.id }).then(
    () => {
      res.status(201).json({
        message: 'Product Deleted !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
} 