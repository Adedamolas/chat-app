import { useState } from "react";
import { CommentsAndLikesProps } from "../types/types";

export const CommentsAndLikes: React.FC<CommentsAndLikesProps> = ({
  post,
  handleAddComment,
}) => {
  const [commentText, setCommentText] = useState<string>("");

  const submitComment = (e: React.FormEvent) => {
    e.preventDefault();
    handleAddComment(post.id, commentText);
    setCommentText("");
  };

  return (
    <div className=" flex flex-col gap-2">
      <h3>Comments:</h3>
      <div className=" grid grid-cols-1 gap-3 h-56 overflow-scroll">
        {post.comments.map((comment, index) => (
          <div key={index} className=" bg-gray-200 w-fit p-3 rounded-xl text-sm">
            <p className=" font-bold"> 
              {comment.userName}: {comment.comment}
            </p>
            <p className=" text-gray-600">Posted on: {comment.createdAt.toDateString()}</p>
          </div>
        ))}
      </div>

      <form onSubmit={submitComment} className=" flex flex-col gap-2">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit" className=" bg-gray-500">Submit</button>
      </form>
      <p className=" py-2 font-semibold">Total Likes: {post.likes.length}</p>
    </div>
  );
};
