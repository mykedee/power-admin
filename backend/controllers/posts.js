const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/asyncHandler");
const Post = require("../models/postModel");

// createPost
// getUser /api/v1/posts
//private/admin
exports.createPost = asyncHandler(async(req, res, next) => {
    let { title, body } = req.body;

    let photos = [];
    if (req.files.length > 0) {
      photos = req.files.map((file) => {
        return { img: file.filename };
      });
    } else {
       return next(new ErrorResponse("Post image is required}", 400))
    }

    if (!title || !body) {
             return next(
               new ErrorResponse("All fields is required", 400)
             );
    }
    let post = await Post.create({
      photos,
      title,
      body,
      postedBy: req.user.id,
    });
    res.status(201).json({
      post,
    });
})

// getAllPosts
// getUsers /api/v1/posts
// public
exports.getPosts = asyncHandler(async(req, res) => {
    const pageSize = process.env.PAGE_SIZE;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Post.count({});
    let posts = await Post.find({})
      .populate("postedBy category", "username createdAt")
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.status(200).json({
      posts,
      count,
      pageSize,
      page,
    });
});

// getUser
// getUser /api/v1/posts/:id
//private/admin
exports.getPost = asyncHandler(async(req, res) => {
    let post = await Post.findById(req.params.id);
    res.status(200).json(post);
});



// updateUser
// getUser /api/v1/posts/:id
//private/admin
exports.updatePost = asyncHandler(async(req, res, next) => {
    let post = await Post.findById(req.params.id);
    if (!post) {
      return next(
        new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
      );
    }

    if (post.postedBy.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse("Not authorised to perform this action", 400)
    )
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Post updated successfully",
    });
})

// getUser
// getUser /api/v1/posts/:id
//private/admin
exports.deletePost = asyncHandler(async(req, res, next) => {
    let post = await Post.findById(req.params.id);

    if (post.postedBy.toString() !== req.user.id && req.user.role !== "admin")

     return next(new ErrorResponse("Not authorised to perform this action", 401));

    post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: " Post deleted successfully",
    });
})
