const City = require("../models/cities.model");
const catchAsync = require("../utils/catchAsync");

const { getDownloadURL, ref, uploadBytes } = require("firebase/storage");
const { storage } = require("../utils/firebase");

exports.CreateCity = catchAsync(async (req, res, next) => {
  const { name, description } = req.body
  const { id } = req.params

  let imgURL;

  if (req.file) {
    const imgRef = ref(storage, `city/${Date.now()}-${req.file.originalname}`);
    const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
    imgURL = imgUploaded.metadata.fullPath;
  }

  const city = await City.create({
    name,
    description,
    imgURL,
    idDepartament: id
  })

  res.status(200).json({
    status: 'success',
    city
  })
});

exports.FindAllCity = catchAsync(async (req, res, next) => {
  const { id } = req.params
  
  const cities = await City.findAll({
    where: {
      idDepartament: id
    }
  });

  const citysWithImgUrl = await Promise.all(
    cities.map(async (city) => {
      const imgRef = ref(storage, city.imgURL);
      const url = await getDownloadURL(imgRef);

      return {
        id: city.id,
        name: city.name,
        description: city.description,
        imgURL: url,
        idDepartament: city.idDepartament
      }
    })
    );

    res.status(200).json({
      status: 'Success',
      data: citysWithImgUrl
    })
});

