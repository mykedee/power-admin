import Loader from "../../components/Loader/Loader";
import Message from "../../components/Errors/Message";
// import { listBlogPost } from "../../components/Actions/blogAction.js";
import Blog from "../../components/BlogSection/Blog";
// import Paginate from "../../components/Paginate";
// import Paginate from "../../components/Paginate";
import { useGetPostsQuery } from "../../slices/blogApiSlice";

const BlogScreen = () => {
	// const { pageNumber } = useParams();
	// const pageNumber = match.params.pageNumber || 1
	// const dispatch = useDispatch();
	// const blogList = useSelector((state) => state.blogList);

	const { isLoading, error, data: posts } = useGetPostsQuery();
	// console.log(posts);

	return (
		<div className="my-5">
			{isLoading ? (
				<div className="text-center">
					<Loader />
				</div>
			) : error ? (
				<Message>{error.data.message || error.error}</Message>
			) : (
				<>
					<div className="my-24 ">
						<div className="w-10/12  md:w-11/12 mx-auto">
							<h2 className="text-2xl font-bold text-primary-green my-10">
								What is happening?
							</h2>
						</div>

						<div className="grid md:grid-cols-2 md:gap-3 grid-cols-1 gap-6">
							{posts?.map((post) => (
								<div className="" key={post._id}>
									<Blog post={post} />
								</div>
							))}
						</div>
						{/* <Paginate pages={pages} page={page} /> */}
					</div>
				</>
			)}
		</div>
	);
};

export default BlogScreen;
