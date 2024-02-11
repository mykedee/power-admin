import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { useGetPostsQuery } from "../../slices/blogApiSlice";

const BlogEdit = (props) => {
	const [title, setTitle] = useState(props.title);
	const [body, setBody] = useState(props.body);

	var toolbarOptions = [
		["bold", "italic", "underline", "strike"],
		["blockquote", "code-block"],
		[{ header: 1 }, { header: 2 }],
		[{ list: "ordered" }, { list: "bullet" }],
		[{ script: "sub" }, { script: "super" }],
		[{ indent: "-1" }, { indent: "+1" }],
		[{ direction: "rtl" }],
		[{ size: ["small", false, "large", "huge"] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ color: [] }, { background: [] }],
		[{ font: [] }],
		[{ align: [] }],
		["clean"],
	];

	const modules = {
		toolbar: toolbarOptions,
	};

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return (
		<div className="form-area">
			<span className="" onClick={handleShow}>
				<AiOutlineEdit />
			</span>

			{show && (
				<div className="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.5)] min-h-full overflow-y-scroll">
					<div className="relative w-11/12 lg:w-1/2 top-24 bottom-0 mx-auto max-w-2xl min-h-full">
						<div className="relative bg-white dark:bg-slate-700 dark:text-zinc-50 rounded-lg shadow">
							<div className="flex items-start justify-between px-8 py-4 border-b rounded">
								<h3 className="text-sm font-semibold text-gray-900 dark:text-zinc-50">
									Edit Post
								</h3>
								<button
									className="text-sm text-gray-900 dark:text-zinc-50"
									show={false}
									onClick={handleClose}
								>
									Close
								</button>
							</div>

							{/* <!--modal body--> */}
							<div className="px-8 py-4">
								<form
									id="edit-modal"
									onSubmit={(e) => {
										e.preventDefault();
										console.log(title, body);
										props.updatePostHandler(title, body);
									}}
								>
									<div className="mb-3" controlId="exampleForm.ControlInput1">
										<input
											className="w-full p-2 border rounded"
											type="text"
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											placeholder="Enter Blog Title"
										/>
									</div>

									<ReactQuill
										className="quill-edit h-28 md:h-48  mb-24 lg:mb-5 rounded text-gray-900 hover:dark:text-zinc-50 dark:text-zinc-50"
										modules={modules}
										theme="snow"
										value={body}
										onEditorChangeText={(e) => setBody(e.target.value)}
									/>

									{/* <!-- modal footer--> */}
									<div className="flex justify-end items-center mt-10 py-10 space-x-2  border-gray rounded-b">
										<button
											variant="secondary"
											onClick={handleClose}
											className="text-sm bg-red-500 text-white p-3 rounded"
										>
											Close
										</button>
										<button
											id="edit-modal"
											className="p-3 text-sm rounded dark:bg-primary-orange bg-primary-green text-white "
										>
											Update
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BlogEdit;
