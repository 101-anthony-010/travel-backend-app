const catchAsync = require("../utils/catchAsync");
const TypicalMeals = require("../models/typicalMeals.model");

const { getDownloadURL, ref, uploadBytes } = require("firebase/storage");
const { storage } = require("../utils/firebase");

exports.CreateTypicalMeal = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;
  const { id } = req.params

  let imgURL;

  if (req.file) {
    const imgRef = ref(storage, `typicalMeal/${Date.now()}-${req.file.originalname}`);
    const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
    imgURL = imgUploaded.metadata.fullPath;
  }

  const typicalMeal = await TypicalMeals.create({
    name,
    description,
    imgURL,
    idDepartament: id
  })

  res.status(200).json({
    status: 'success',
    typicalMeal
  })
});

exports.FindAllTypicalMeals = catchAsync(async (req, res, next) => {
  const { id } = req.params
  
  const typicalMeals = await TypicalMeals.findAll({
    where: {
      idDepartament: id
    }
  });
  const typicalMealsWithImgUrl = await Promise.all(
    typicalMeals.map(async (typicalMeal) => {
      const imgRef = ref(storage, typicalMeal.imgURL);
      const url = await getDownloadURL(imgRef);

      return {
        id: typicalMeal.id,
        name: typicalMeal.name,
        description: typicalMeal.description,
        imgURL: url,
        idDepartament: typicalMeal.idDepartament
      }
    })
    );

    res.status(200).json({
      status: 'Success',
      data: typicalMealsWithImgUrl
    })
});