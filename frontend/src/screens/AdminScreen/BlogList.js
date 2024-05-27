import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../slices/blogApiSlice";
import CardContainer from "../../components/Common/CardContainer";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Errors/Message";
import BlogEdit from "../../components/BlogSection/BlogEdit";
import AddBlog from "../../components/BlogSection/AddBlog";
import DialogBox from "../../components/Common/DialogBox";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";
import moment from "moment";

const BlogList = () => {
  const [page, setPage] = useState(1);
  const { isLoading, refetch, data, error, pages, pageSize, count } =
    useGetPostsQuery(page);
  const [deletePost] = useDeletePostMutation();
  const [open, setOpen] = useState(false);
  const dateFormat = (date) => {
    return moment(date).utcOffset(0).format("  MMMM DD YYYY (hh:mm:ss a)");
  };

  const handleDelete = async (id) => {
    if (open === true) {
      try {
        await deletePost(id);

        (
          <DialogBox
            open={open}
            setOpen={setOpen}
            handleDelete={handleDelete}
          />
        ) && toast.success("User deleted successfully");
        setOpen(false);
        refetch();
      } catch (error) {
        toast.error(error.data.message || error.error);
      }
    }
  };
  return (
    <CardContainer>
      <div className="flex justify-between items-center my-2">
        <div>
          <h3 className="text-left text-slate-700 py-3 md:text-base font-bold text-sm">
            Posts
          </h3>
        </div>

        <div className="">
          <AddBlog />
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <div className="relative overflow-x-auto lg:overflow-x-hidden rounded-t-lg shadow bg-white">
            <table className="table-auto w-full dark:bg-slate-600 bg-white svg:dark">
              <thead className="text-left text-sm text-slate-600 dark:text-white border-b">
                <tr className="whitespace-nowrap">
                  <th scope="col" className=" px-3 py-3">
                    #
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    Title
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    Body
                  </th>
                  <th scope="col" className=" px-3 py-3 overflow-x">
                    Date Created
                  </th>
                  <th scope="col" className=" px-3 py-3">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {data.posts.map((post, index) => (
                  <tr className="border-b px-3 py-3" key={post._id}>
                    <td className="border-b px-3 py-3">
                      {(data.page - 1) * data.pageSize + index + 1}
                    </td>
                    <td className="border-b px-3 py-3 whitespace-nowrap">
                      {post.title}
                    </td>
                    <td className="border-b px-3 py-3 whitespace-pre lg:whitespace-normal ">
                      {post.body.substring(0, 50)}...
                    </td>
                    <td className="border-b px-3 py-3 whitespace-nowrap">
                      {dateFormat(post.createdAt)}
                    </td>
                    <td className="border-b px-3 py-3">
                      <span className="flex justify-start space-x-4 align-items-center">
                        <BlogEdit className="mx-10" />

                        <AiOutlineDelete onClick={() => setOpen(true)} />

                        {open && (
                          <DialogBox
                            open={open}
                            setOpen={setOpen}
                            handleDelete={() => handleDelete(post._id)}
                          />
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Paginate
            pages={pages}
            pageSize={pageSize}
            page={page}
            data={data}
            setPage={setPage}
          />
        </>
      )}
    </CardContainer>
  );
};

export default BlogList;
