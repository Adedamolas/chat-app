import { useContext, useState } from "react";
// import { CommentsAndLikesProps } from "../types/types";
import { AppContext } from "../helpers/Context";
import Spinner from "../loader/Spinner";
import { Post } from "../types/types";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiDeleteBinLine, RiMore2Fill, RiMore2Line } from "@remixicon/react";
import { auth } from "../firebase-config";

interface CommentsAndLikesProps {
  post: Post;
  handleAddComment: (postId: string, commentText: string) => void;
  handleDeleteComment: (postId: string, comment: any) => void;
}
export const CommentsAndLikes: React.FC<CommentsAndLikesProps> = ({
  post,
  handleAddComment,
  handleDeleteComment,
}) => {
  const { submitting } = useContext(AppContext);

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
          <div
            key={index}
            className=" bg-gray-300 w-fit p-3 rounded-xl text-sm"
          >
            <div className=" flex flex-row items-center gap-2 px-2">
              {comment.profileImage && (
                <img
                  src={comment.profileImage}
                  alt={`${comment.userName}'s profile`}
                  className=" w-8 rounded-full"
                />
              )}
              <p>{comment.userName}</p>
              <div>
                {comment.userId === auth.currentUser?.uid && (
                  <span onClick={() => handleDeleteComment(post.id, comment)}>
                    <RiDeleteBinLine className=" cursor-pointer transition-all p-1 rounded-full hover:bg-gray-100" />
                  </span>
                )}
              </div>
            </div>

            <div className=" px-2">
              <p className=" font-bold px-1">{comment.comment}</p>
              <p className=" text-gray-600">
                Posted on: {comment.createdAt.toDateString()}
              </p>
            </div>
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
        <button type="submit" className=" bg-gray-500">
          {submitting ? (
            <>
              <Spinner />
              Submitting
            </>
          ) : (
            <>Submit</>
          )}
        </button>
      </form>
      <p className=" py-2 font-semibold">Total Likes: {post.likes.length}</p>
    </div>
  );
};
