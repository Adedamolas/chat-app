import { RiDeleteBin2Line } from "@remixicon/react";
import TruncatedText from "../reusables/TruncateText";
import { Post } from "../types/types";
import { auth } from "../firebase-config";
import CapitalizeWords from "../reusables/CapitalizeWords";
import { useContext } from "react";
import { AppContext } from "../helpers/Context";
import { Link } from "react-router-dom";

export default function  Posts() {
  const { posts } = useContext(AppContext);
  const maxLength = 18;
  return (
    <div className="grid flex-col gap-x-5 grid-cols-1 md:grid-cols-4 w-full justify-center place-items-center align-middle items-center px-10">
      {posts.map((post: Post) => {
        return (
          <Link to={`/post/${posts.id}`}>
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
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
