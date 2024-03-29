const express = require('express');
const upload = require('../utils/multer');

const router = express.Router();

//Controller functions
const cityController = require('./../controllers/city.controller')

//Middleware functions

router
  .route('/')
  .get(
    cityController.FindAllCity
  )

router
  .route('/:id')
  .post(
    upload.single('imgURL'),
    cityController.CreateCity
  )

module.exports = router;