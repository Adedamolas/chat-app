import {
  RiChat3Fill,
  RiChat3Line,
  RiCloseLargeLine,
  RiDeleteBin2Line,
  RiHeart3Fill,
  RiHeart3Line,
} from "@remixicon/react";
import TruncatedText from "../reusables/TruncateText";
import { Post, Post as PostType } from "../types/types";
import { auth } from "../firebase-config";
import CapitalizeWords from "../reusables/CapitalizeWords";
import { useContext } from "react";
import { AppContext } from "../helpers/Context";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { CommentsAndLikes } from "./CommentsAndLikes";
import Like from "../lib/Framer-Motion/LikeButton";
import LikeButton from "../lib/Framer-Motion/LikeButton";
import { useNavigate } from "react-router-dom";


export default function Posts() {
  const {
    posts,
    closeModal,
    selectedPost,
    handleAddComment,
    handleDeleteComment,
    handleLike,
    openModal,
  } = useContext(AppContext);
  const maxLength = 18;
  const navigate = useNavigate();

  const handleRoute = (id: string) => {
    navigate(`/post/${id}`);
  };

  return (
    <div className="grid flex-col gap-x-5 grid-cols-1 md:grid-cols-4 w-full justify-center place-items-center align-middle items-center px-10">
      {posts.map((post: Post) => {
        return (
          <div
            key={post.id}
            className=" flex flex-col gap-5 text-left items-center py-4 relative"
          >
            {post.imageUrl && (
              <div
                onClick={() => handleRoute(post.id)}
                className=" bg-center bg-cover w-64 h-56 rounded-xl relative cursor-pointer"
                style={{ backgroundImage: `url(${post.imageUrl})` }}
              ></div>
            )}
            <div className=" flex flex-col items-start space-y-2 rounded-lg bg-gray-300 w-[90%] p-2 -translate-y-24 shadow-blue-500 drop-shadow-lg">
              <div className=" flex flex-row justify-between items-center w-fit space-x-10">
                <h3
                  onClick={() => handleRoute(post.id)}
                  className=" font-bold text-xl border-b-2 border-transparent cursor-pointer hover:border-black"
                >
                  <TruncatedText text={post.title} maxLength={maxLength} />
                </h3>
              </div>
              <h4 className=" font-medium text-gray-700">
                @{post.author.name}
              </h4>
              <h4
                className=" bg-gray-200 text-black p-1 text-xs
               rounded-md w-min"
              >
                {post.niche}
              </h4>
              <h5>Posted at: {new Date(post.createdAt).toLocaleString()}</h5>
              <div className=" flex flex-row gap-2 p-1 bg-gray-200 rounded-lg">
                <div className=" flex flex-row">
                  <LikeButton
                    isLiked={
                      post?.likes?.includes(auth.currentUser?.uid ?? "") ??
                      false
                    }
                    onLike={() => handleLike(post.id)}
                  />

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
          </div>
        );
      })}

      {selectedPost && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          className={
            " flex flex-col bg-gray-200 w-1/2 backdrop-blur-xl mt-24 mx-auto p-8 rounded-xl border-white gap-3"
          }
        >
          <div className=" flex flex-row items-center justify-between">
            {/* <span>{selectedPost.author.}</span> */}
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
  );
}
