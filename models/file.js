const mongoose = require('mongoose');
const  deepPopulate = require('mongoose-deep-populate')(mongoose);
const findVisible = require('./findVisible');
const FilesSchema = mongoose.Schema(
    {

    name: {
        type: String
    },
    type: {
        type: String
    },
    fileUrl: {
        type: String
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    deleted_at: {
        type: Date
    },
    thumbnail: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
    image: {
        type: mongoose.Types.ObjectId,
        ref: "category",
      }
  

});
const populate =[{
    path : 'thumbnail',
    match : {isVisible : true}
},
{
    path : ' image',
    match : {isVisible : true}
}
];
FilesSchema.pre('find', findVisible(populate));
FilesSchema.pre('findOne', findVisible(populate));
FilesSchema.pre('findOneAndUpdate', findVisible());
FilesSchema.pre('count', findVisible());
FilesSchema.pre('countDocuments', findVisible());

FilesSchema.plugin(deepPopulate,{})
const File = mongoose.model('file', FilesSchema);
 module.exports = File;
