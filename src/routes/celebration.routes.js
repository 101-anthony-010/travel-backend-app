const express = require('express');
const upload = require('../utils/multer');

const router = express.Router();

//Controller functions
const celebrationController = require('./../controllers/celebration.controller');

//Middleware functions

router
  .route('/:id')
  .post(
    upload.single('imgURL'),
    celebrationController.CreateCelebration
  )
  .get(
    celebrationController.FindAllCelebrations
  )
module.exports = router;