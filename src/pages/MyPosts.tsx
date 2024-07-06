import { useContext } from "react";
import { AppContext } from "../helpers/Context";
import Loader from "../loader/Loader";
import { auth } from "../firebase-config";
import { Post } from "../types/types";

export default function MyPosts() {
  const { loading, userPosts } = useContext(AppContext);
  if (loading) {
    return (
      <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
        <Loader />
      </div>
    );
  }
  if (!auth.currentUser) {
    return <p>Abeg login before you fit see your posts.....</p>;
  }
  return (
    <div className=" w-full h-full space-y-5 flex flex-col align-middle justify-start place-items-middle py-48 sm:py-32 items-center">
      <div>
        <h2 className=" font-extrabold">Your posts... You can def make much more.</h2>
      </div>
      <div className=" grid grid-cols-1 items-start px-28 gap-0 w-full">
        {userPosts.map((post: Post) => {
          return (
              <div
              key={post.id}
              className=" flex flex-col w-3/4 gap-5 text-left items-start py-4 cursor-pointer"
            >
              {post.imageUrl && (
                <div
                  className=" bg-center bg-cover w-3/4 h-64 rounded-xl relative"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                ></div>
              )}
              <div className=" flex flex-col items-start space-y-2 rounded-lg bg-gray-300 ml-5 w-[60%] p-2 -translate-y-20 shadow-blue-500 drop-shadow-lg">
                <div className=" flex flex-col justify-start items-start w-fit gap-3">
                  <h3 className=" font-bold text-xl">
                    {post.title}
                    {/* <TruncatedText text={post.title} maxLength={maxLength} /> */}
                  </h3>
                  <p>
                    {post.postText}
                  </p>
                </div>
                <h4 className=" font-medium text-gray-700">
                  @{post.author.name}
                </h4>
                <h4 className=" bg-gray-200 text-black p-2 text-sm rounded-md w-min">
                  {post.niche}
                </h4>
                <h5>Posted at: {new Date(post.createdAt).toLocaleString()}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
