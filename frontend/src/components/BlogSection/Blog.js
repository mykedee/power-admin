import React from "react";
import { Link } from "react-router-dom";

const Blog = ({ post }) => {
	return (
		<>
			<section className="w-10/12 mx-auto p-5 bg-red-400 ">
				<Link className="blog-title" to={`/blogs/${post._id}`}>
					<div>{post.title}</div>
				</Link>
				<div>{post.body}</div>
				<div>{post.postedBy}</div>
			</section>
		</>
	);
};

export default Blog;
