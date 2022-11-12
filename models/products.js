const mongoose = require('mongoose');
const  deepPopulate = require('mongoose-deep-populate')(mongoose);

const findVisible = require('./findVisible');
const productsSchema = mongoose.Schema(
    {
    title : { type : String, required : true  },
    description: { type : String, required : false  },
    price : {type : Number , required: true},
    stock : {type : Number , required: true},
    category : {   type: mongoose.Schema.Types.ObjectId,
                    ref : "category"},
    thumbnail :{ type : String, required : false  },
    images : [{type : String  }],
    isVisible : {type: Boolean, default: true},
    created_at: {
        type: Date,
        default: Date.now(),
      },
      updated_at: {
        type: Date,
        default: Date.now(),
      },
      deleted_at: {
        type: Date,
        default: null,
      },  
       
    })

 const populate =[{
      path : 'category',
      match : {isVisible : true}
  }
  ];
productsSchema.pre('find', findVisible(populate));
productsSchema.pre('findOne', findVisible(populate));
productsSchema.pre('findOneAndUpdate', findVisible());
productsSchema.pre('count', findVisible());
productsSchema.pre('countDocuments', findVisible());

productsSchema.plugin(deepPopulate,{})
 const Product = mongoose.model('product', productsSchema);
 module.exports = Product;
