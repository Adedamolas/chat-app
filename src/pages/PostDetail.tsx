import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { Post } from "../types/types";
import { db } from "../firebase-config";
import { RiChat3Fill, RiHeart3Fill, RiImage2Line } from "@remixicon/react";
import Loader from "../loader/Loader";

const PostDetails: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    console.log("postId:", postId);
    const fetchPost = async () => {
      if (postId) {
        const postRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          setPost(postDoc.data() as Post);
        } else {
          console.error("Post not found");
        }
      }
    };
    fetchPost();
  }, [postId]);

  if (!post) {
    return (
      <div className="w-full h-full flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <section className=" py-40 sm:py-32 md:px-12 px-72 flex flex-col items-start space-y-5">
      <div className=" flex flex-col space-y-5">
        <h4 className=" p-2 bg-gray-300 text-black w-min rounded-lg">
          {post.niche}
        </h4>
        <h2 className=" text-6xl font-extrabold leading-[65px]">
          {post.title}
        </h2>
        <div className=" flex flex-row space-x-2 items-center bg-gray-200 w-fit p-2 rounded-lg">
          <div>
            <img
              className=" w-8 sm:w-8 rounded-full"
              src={post.author.profile_image || ""}
              alt=""
            />
          </div>
          <div className=" text-sm">
            <p>{post.author.name}</p>
            <p> Published at: {new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
        <div className=" flex flex-row gap-3">
          <span className=" flex flex-row gap-1">
            <RiHeart3Fill className=" text-red-500" />
            {post.likes.length}
          </span>
          <span className=" flex flex-row gap-1">
            <RiChat3Fill />
            {post.comments.length}
          </span>
        </div>
      </div>
      {post.imageUrl ? (
        <div
          className=" w-[40rem] h-80 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.imageUrl})` }}
        ></div>
      ) : (
        <div className=" flex flex-col items-center justify-center w-[40rem] h-80 bg-gray-400">
          <span className=" p-1 rounded-md bg-gray-400">
            <RiImage2Line />
          </span>
        </div>
      )}

      <div>
        <p>{post.postText}</p>
      </div>
      {/* <p>{post.postText}</p> */}
      <p>By: {post.author.name}</p>
      <p>Likes: {post.likes.length}</p>
      <div className=" flex flex-col justify-start space-y-4">
        <h3>Comments:</h3>
        <div className=" grid grid-cols-2 flex-col gap-2">
          {post.comments.map((comment, index) => (
            <div
              key={index}
              className=" p-2 bg-gray-200 flex flex-row justify-between items-center space-x-4 rounded-lg"
            >
              <div>
                <p className=" text-gray-700">{comment.userName}:</p>
                <p className=" font-bold">{comment.comment}.</p>
              </div>
              <div>
                <img
                  className=" w-8 rounded-full"
                  src={comment.profileImage || ""}
                  alt="img"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PostDetails;
