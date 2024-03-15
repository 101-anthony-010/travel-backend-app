const express = require('express');
const upload = require('../utils/multer');

const router = express.Router();

//Controller functions
const postController = require("./../controllers/post.controller")

//Middleware functions
const authMiddleware = require("./../middlewares/auth.middleware")

router.use(authMiddleware.protect)

router
  .route('/')
  .post(
    upload.single("imgURL"),
    postController.createPost
  )
  .get(
    postController.findAllPost
  )

module.exports = router;