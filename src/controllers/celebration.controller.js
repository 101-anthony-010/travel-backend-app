const catchAsync = require("../utils/catchAsync");
const Celebration = require("../models/celebrations.model");

const { getDownloadURL, ref, uploadBytes } = require("firebase/storage");
const { storage } = require("../utils/firebase");

exports.CreateCelebration = catchAsync(async (req, res, next) => {
  const { name, description, date } = req.body;
  const { id } = req.params

  let imgURL;

  if (req.file) {
    const imgRef = ref(storage, `celebration/${Date.now()}-${req.file.originalname}`);
    const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
    imgURL = imgUploaded.metadata.fullPath;
  }

  const celebrations = await Celebration.create({
    name,
    description,
    imgURL,
    date,
    idDepartament: id
  })

  res.status(200).json({
    status: 'success',
    celebrations
  })
});

exports.FindAllCelebrations = catchAsync(async (req, res, next) => {
  const { id } = req.params
  
  const celebrations = await Celebration.findAll({
    where: {
      idDepartament: id
    }
  });

  const celebrationWithImgUrl = await Promise.all(
    celebrations.map(async (celebration) => {
      const imgRef = ref(storage, celebration.imgURL);
      const url = await getDownloadURL(imgRef);

      return {
        id: celebration.id,
        name: celebration.name,
        description: celebration.description,
        imgURL: url,
        date: celebration.date,
        idDepartament: celebration.idDepartament
      }
    })
    );

    res.status(200).json({
      status: 'Success',
      data: celebrationWithImgUrl
    })
});