const Cars = require("../models/carModel");
const multer = require("multer");

const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image! Please upload only images", 400), false);
//   }
// };
const upload = multer({
  storage: multerStorage,
  // filter: multerFilter,
});

exports.uploadImage = upload.fields([
  { name: "photos" },
  { name: "model", maxCount: 1 },
  { name: "price", maxCount: 1 },
  { name: "phone", maxCount: 1 },
  { name: "city", maxCount: 1 },
  { name: "photosNo", maxCount: 1 },
]);

exports.converToBase64 = (req, res, next) => {
  const finalArr = req.files.photos.map((el) => {
    const myBlob = el.buffer;
    const base64Data = myBlob.toString("base64");
    return base64Data;
  });
  req.body.photos = finalArr;
  next();
};
exports.newCar = async (req, res, next) => {
  const newCar = await Cars.create({
    model: req.body.model,
    price: req.body.price,
    phone: req.body.phone,
    city: req.body.city,
    photosNo: req.body.photosNo,
    photos: req.body.photos,
    user: "65de21721d9e51049f28aa5b",
  });
  res.status(200).json({
    status: "success",
    data: {
      newCar,
    },
  });
};
