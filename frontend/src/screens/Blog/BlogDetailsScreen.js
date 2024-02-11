import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGetPostDetailsQuery } from "../../slices/blogApiSlice";

import Loader from "../../components/Loader/Loader";

const BlogDetailsScreen = () => {
	const { id: Id } = useParams();
	const { data: post, isLoading, error } = useGetPostDetailsQuery(Id);

	return (
		<>
			<div className="my-10 w-10/12  md:w-11/12 mx-auto">
				<Link
					className="p-3 bg-primary-green text-slate-50 rounded"
					to="/blogs"
				>
					Go Back
				</Link>
			</div>

			{isLoading ? (
				<div className="text-center my-10 w-10/12  md:w-11/12 mx-auto">
					<Loader />
				</div>
			) : error ? (
				<div variant="danger">{error?.data?.message || error.error}</div>
			) : (
				<div className="my-10 w-10/12  md:w-11/12 mx-auto">{post.title}</div>
			)}
		</>
	);
};

export default BlogDetailsScreen;
