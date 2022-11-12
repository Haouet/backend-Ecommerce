const mongoose = require('mongoose');
const  deepPopulate = require('mongoose-deep-populate')(mongoose);
const catSchema = mongoose.Schema(
    {
    name : { type : String, required: [true, "name field is required"] },
    desc: { type : String, required: [true, "desc field is required"]  },
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
const populate =[];
 const Category = mongoose.model('category', catSchema);
 module.exports = Category;
