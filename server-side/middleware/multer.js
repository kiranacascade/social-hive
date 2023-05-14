const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "Public");
  },
  filename: (re, file, cb) => {
    cb(null, "PIMG" + "-" + Date.now() + Math.round(Math.random() * 1000000000) + "." + file.mimetype.split("/")[1]);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "png" || file.mimetype.split("/")[1] === "jgp" || file.mimetype.split("/")[1] === "jpeg") {
    cb(null, true);
  } else {
    cb("File type not allowed", false);
  }
};

express.multerUpload = multer({ storage, fileFilter });

/* 
// ini untuk di routes nya
router.post('/single-upload', multerUpload.single('file'), (req, res) => {
    let fileUpload = req.file;
    console.log(fileUploaded);

    res.json({
        status: 'ok',
        message: "file successfully uploaded"
    })
})

router.post('/multiple-upload', multerUpload.array('files'), (req, res) => {
    let fileUpload = req.files;
    console.log(fileUploaded);

    res.json({
        status: 'ok',
        message: "files successfully uploaded"
    })
})

module.exports = router;
*/
