const { ref, uploadBytes, getDownloadURL, deleteObject } = require("firebase/storage");
const Post = require("../models/posts.model");
const catchAsync = require("../utils/catchAsync");
const { storage } = require("../utils/firebase");

exports.createPost = catchAsync(async (req, res, next) => {
  const { name } = req.body;
  const { sessionUser } = req;

  let imgURL;

  if (req.file) {
    const imgRef = ref(storage, `posts/${Date.now()}-${req.file.originalname}`);
    const imgUploaded = await uploadBytes(imgRef, req.file.buffer);
    imgURL = imgUploaded.metadata.fullPath;
  }

  const post = await Post.create({
    name,
    idUser: sessionUser.id,
    imgURL, 
  });

  res.status(200).json({
    status: 'success',
    message: 'Created post',
    post
  });
});

exports.findAllPost = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;

  const posts = await Post.find({ userId: sessionUser.id });

  res.status(200).json({
    status: 'success',
    posts,
  });
});
