const express = require('express');
const upload = require('../utils/multer');

const router = express.Router();

//Controller functions
const typicalMealController = require('./../controllers/typicalMeal.controller');

//Middleware functions

router
  .route('/')
  .get(
    typicalMealController.FindAllTypicalMeals
  )

router
  .route('/:id')
  .post(
    upload.single('imgURL'),
    typicalMealController.CreateTypicalMeal
  )

module.exports = router;