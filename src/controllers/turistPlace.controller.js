const catchAsync = require("../utils/catchAsync");
const TuristsPlaces = require("../models/turistsPlaces.model");

const { getDownloadURL, ref, uploadBytes } = require("firebase/storage");
const { storage } = require("../utils/firebase");

exports.CreateTuristPlace = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const { id } = req.params

  let imgURL;

  if (req.file) {
    const imgRef = ref(storage, `turistPlace/${Date.now()}-${req.file.originalname}`);
    const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
    imgURL = imgUploaded.metadata.fullPath;
  }

  const turistPlace = await TuristsPlaces.create({
    name,
    description,
    imgURL,
    idDepartament: id
  })

  res.status(200).json({
    status: 'success',
    turistPlace
  })
});

exports.FindAllTuristPlace = catchAsync(async (req, res, next) => {
  const { id } = req.params
  
  const turistsPlaces = await TuristsPlaces.findAll({
    where: {
      idDepartament: id
    }
  });

  const turistPlacesWithImgUrl = await Promise.all(
    turistsPlaces.map(async (turistPlace) => {
      const imgRef = ref(storage, turistPlace.imgURL);
      const url = await getDownloadURL(imgRef);

      return {
        id: turistPlace.id,
        name: turistPlace.name,
        description: turistPlace.description,
        imgURL: url,
        idDepartament: turistPlace.idCity
      }
    })
    );

    res.status(200).json({
      status: 'Success',
      data: turistPlacesWithImgUrl
    })
});