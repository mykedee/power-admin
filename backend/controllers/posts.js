const Post = require("../models/postModel");

// const posts = require("../data/posts");

// app.get("/api/v1", (req, res) => {
// 	res.json(posts);
// });

// console.log(posts);

// getAllPosts
// getUsers /api/v1/posts
// public
exports.getPosts = async (req, res) => {
	try {
		const pageSize = 5;
		const page = Number(req.query.pageNumber) || 1;
		const count = await Post.count({});
		let posts = await Post.find({})
			.populate("postedBy", "username createdAt")
			.limit(pageSize)
			.skip(pageSize * (page - 1));
		res.status(200).json({
			posts,
			count,
			pageSize,
			page,
		});
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

// exports.getPosts = async (req, res) => {
// 	try {
// 		const pageSize = 5;
// 		const page = Number(req.query.pageNumber) || 1;
// 		const count = await Post.count({});
// 		let posts = await Post.find()
// 			.populate("postedBy", "username createdAt")
// 			.limit(pageSize)
// 			.skip(pageSize * (page - 1));
// 		res.status(200).json({
// 			posts,
// 			page,
// 			pages: Math.ceil(count / pageSize),
// 		});
// 	} catch (error) {
// 		res.status(400).json({
// 			error: error.message,
// 		});
// 	}
// };

// getUser
// getUser /api/v1/auth/users/:id
//private/admin
exports.getPost = async (req, res) => {
	try {
		let post = await Post.findById(req.params.id);
		// .populate(
		// 			"postedBy",
		// 			"username"
		// 		);
		res.status(200).json(post);
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// createPost
// getUser /api/v1/posts
//private/admin
exports.createPost = async (req, res) => {
	try {
		let { title, body, postedBy } = req.body;

		let photos = [];
		if (req.files.length > 0) {
			photos = req.files.map((file) => {
				return { img: file.filename };
			});
		} else {
			return res.status(400).json({
				message: "Post image is required",
			});
		}

		if (!title || !body) {
			return res.status(400).json({
				message: "All fields is required",
			});
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
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// updateUser
// getUser /api/v1/auth/users/:id
//private/admin
exports.updatePost = async (req, res) => {
	try {
		let post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(400).json({
				message: "Post not found",
			});
		}

		if (post.postedBy.toString() !== req.user.id && req.user.role !== "admin") {
			return res.status(400).json({
				message: "Not authorised to perform this action",
			});
		}

		post = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});

		res.status(200).json({
			message: "Post updated successfully",
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};

// getUser
// getUser /api/v1/auth/users/:id
//private/admin
exports.deletePost = async (req, res) => {
	try {
		let post = await Post.findById(req.params.id);

		if (post.postedBy.toString() !== req.user.id && req.user.role !== "admin")
			return res.status(401).json({
				message: " Not authorized to perform this action",
			});

		post = await Post.findByIdAndDelete(req.params.id);
		res.status(200).json({
			message: " Post deleted successfully",
		});
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
};
