var Cat= require("../models/category")

exports.getAllCat = (req, res, next) => {
    Cat.find()
      .then((data) => {
        return res
          .status(200)
          .json({ success: true, Category: data.length, data: data });
          
      })
      .catch((err) => {
        console.log(err);
        return res.status(404).json({ err: err });
      });
  };
exports.addManyCat = (req, res, next) => {
        Cat.insertMany(req.body.cats).then(function () {
        return res.status(201).json({ success: true, msg: 'Successful created multiple categoryr' });  //creation successfull
    }).catch(function (error) {
        return res.status(401).json({ success: true, msg: 'Category existt', error: error });  //creation successfull
    });
  };
  exports.getByid = (req, res, next) => {
    Cat.findById(req.params.id)
        .then((data) => {
          data
            ? res.status(200).json({ success: true, data: data })
            : res.status(404).json({ success: false, data: "No cat Found" });
        })
        .catch((err) => {
          console.error(err);
          return res.status(403).json({ err: err });
        });
};
exports.getByName = (req, res, next) => {
  const name = req.params.name;
 
  Cat.find({name : name })
      .then((data) => {
        data
          ? res.status(200).json({ success: true, data: data })
          : res.status(404).json({ success: false, data: "No cat Found" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(403).json({ err: err });
      });
};


  