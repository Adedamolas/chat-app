import { useContext } from "react";
import Posts from "../components/Posts";
import { AppContext } from "../helpers/Context";
import Loader from "../loader/Loader";
import {
  RiChat3Fill,
  RiChat3Line,
  RiCloseLargeLine,
  RiDeleteBin2Line,
  RiHeart3Fill,
  RiHeart3Line,
} from "@remixicon/react";
import TruncatedText from "../reusables/TruncateText";
import { Post } from "../types/types";
import { auth } from "../firebase-config";
import CapitalizeWords from "../reusables/CapitalizeWords";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { CommentsAndLikes } from "../components/CommentsAndLikes";

interface CommentsAndLikesProps {
  post: Post;
  handleAddComment: (postId: string, commentText: string) => void;
}

export default function Stories() {
    const { posts, closeModal, selectedPost, handleLike, handleAddComment, handleDeleteComment ,openModal, loading } =
    useContext(AppContext);
  const maxLength = 18;
    if (loading) {
      return (
        <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
          <Loader />
        </div>
      );
    }
  return (
    <section className=" py-24 flex flex-col space-y-10 px-8">
      <div className=" px-14 font-bold">
        <h2>Posts</h2>
      </div>
    <div className="grid flex-col gap-x-5 grid-cols-1 md:grid-cols-4 w-full justify-center place-items-center align-middle items-center px-10">
      {posts.map((post: Post) => {
        return (
          <div
            key={post.id}
            className=" flex flex-col gap-5 text-left items-center py-4 cursor-pointer"
          >
            {post.imageUrl && (
              <div
                className=" bg-center bg-cover w-64 h-56 rounded-xl relative"
                style={{ backgroundImage: `url(${post.imageUrl})` }}
              ></div>
            )}
            <div className=" flex flex-col items-start space-y-2 rounded-lg bg-gray-300 w-[90%] p-2 -translate-y-24 shadow-blue-500 drop-shadow-lg">
              <div className=" flex flex-row justify-between items-center w-fit space-x-10">
                <h3 className=" font-bold text-xl">
                  <TruncatedText text={post.title} maxLength={maxLength} />
                </h3>
              </div>
              <h4 className=" font-medium text-gray-700">
                @{post.author.name}
              </h4>
              <h4 className=" bg-gray-200 text-black p-2 text-sm rounded-md w-min">
                {post.niche}
              </h4>
              <h5>Posted at: {new Date(post.createdAt).toLocaleString()}</h5>
              <div className=" flex flex-row gap-2 p-1 bg-gray-200 rounded-lg">
                <div className=" flex flex-row">
                  <span onClick={() => handleLike(post.id)}>
                    <RiHeart3Fill className=" text-red-500" />
                  </span>
                  <p>{post.likes.length}</p>
                </div>
                <div onClick={() => openModal(post)} className=" flex flex-row">
                  <span>
                    <RiChat3Fill />
                  </span>
                  <p className=" flex flex-row">{post.comments.length}</p>
                </div>
              </div>
            </div>
            {/* <CommentsAndLikes post={post} /> */}
          </div>
        );
      })}

      {selectedPost && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          className={
            " flex flex-col w-1/2 backdrop-blur-xl mt-24 mx-auto p-8 rounded-xl border-white gap-3"
          }
        >
          <div className=" flex flex-row items-center justify-between">
            <h2>{selectedPost.title}</h2>
            <span onClick={closeModal}>
              {" "}
              <RiCloseLargeLine className=" text-black cursor-pointer" />{" "}
            </span>
          </div>
          <CommentsAndLikes
            post={selectedPost}
            handleAddComment={handleAddComment}
            handleDeleteComment={handleDeleteComment}
          />
        </Modal>
      )}
      </div>
    </section>
  );
}
