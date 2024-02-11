import { apiSlice } from "./apiSlice";
import { BLOG_URL } from "../constants";

const blogApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getPosts: builder.query({
			query: (page = 1) => ({ url: `${BLOG_URL}?page=${page}` }),
		}),

		getPostDetails: builder.query({
			query: (Id) => ({ url: `${BLOG_URL}/${Id}` }),
			keepUnusedDataFor: 5,
		}),

		addPost: builder.mutation({
			query(body) {
				return {
					url: `${BLOG_URL}`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["Product"],
		}),

		deletePost: builder.mutation({
			query(postId) {
				return {
					url: `${BLOG_URL}/${postId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["Product"],
		}),
	}),
});

export const {
	useGetPostsQuery,
	useGetPostDetailsQuery,
	useAddPostMutation,
	useDeletePostMutation,
} = blogApiSlice;
