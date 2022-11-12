const File = require('../models/file');

// Add File

exports.addMultipleFile = (req,res,next) =>{
    // var opts = {};
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    // opts.secretOrKey = config.secret;
    // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        const url = req.protocol + '://' + req.get('host');

        // console.log(jwt_payload);
        if (!req.files) {
          res.status(400).json({
            error: 'there is no file'
          });
        }
        req.files.map(fileTemp => {
          const file = new File({
            name: fileTemp.filename,
            type: fileTemp.mimetype,
            user_id: req.body.user_id,
            fileUrl: url + '/files/' + fileTemp.filename,
            created_at: Date.now(),
            updated_at: Date.now()
          });
          file.save().then(
            () => {
              res.status(201).json({
                message: 'File saved successfully!',
                file
              });
            }
          ).catch(
            (error) => {
              res.status(400).json({
                error: error
              });
            }
          );
        });
    
}

exports.addFile = (req,res,next) =>{
    // var opts = {};
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    // opts.secretOrKey = config.secret;
    // passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        const url = req.protocol + '://' + req.get('host');
        // console.log(jwt_payload);
        if (!req.file) {
          res.status(400).json({
            error: 'there is no file'
          });
        }      
          const file = new File({
            name: req.file.filename,
            type: req.file.mimetype,
            images: req.body.images,
            fileUrl: url + '/files/' + req.file.filename,
            created_at: Date.now(),
            updated_at: Date.now()
          });
          file.save().then(
            () => {
              res.status(201).json({
                message: 'File saved successfully!',
                file
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


exports.getFiles = (req,res,next) => {
File.find().populate({
    path: 'user_id',
    model: 'User',
    populate: { path: 'images' }
  }).then(files=>{
    res.status(200).send({
        files: files
    })
}).catch(err=>{
  res.status(401).send({
    err: err
  })
})

}