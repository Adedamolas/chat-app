import { RiDeleteBin2Line } from "@remixicon/react";
import TruncatedText from "../reusables/TruncateText";
import { Post } from "../types/types";
import { auth } from "../firebase-config";
import CapitalizeWords from "../reusables/CapitalizeWords";
import { useContext } from "react";
import { AppContext } from "../helpers/Context";

export default function Posts() {
  const { posts } = useContext(AppContext);
  const maxLength = 12;
  return (
    <div className="grid flex-col gap-10 grid-cols-4 w-full justify-center place-items-center align-middle items-center px-20">
      {posts.map((post: Post) => {
        return (
          <div
            key={post.id}
            className=" flex flex-col gap-5 text-left items-start py-4"
          >
            {post.imageUrl && (
              <div
                className=" bg-center bg-cover w-56 h-56 rounded-xl"
                style={{ backgroundImage: `url(${post.imageUrl})` }}
              ></div>
            )}
            <div className=" flex flex-col items-start space-y-2">
              <div className=" flex flex-row justify-between items-center w-fit space-x-10">
                <h3 className=" font-bold text-3xl">
                  <TruncatedText text={post.title} maxLength={maxLength} />
                </h3>
              </div>
              <h4 className=" font-medium text-gray-500">
                @{post.author.name}
              </h4>
              <h4 className=" bg-black text-white p-2 rounded-md w-min">
                {post.niche}
              </h4>
              <h5>Posted at: {new Date(post.createdAt).toLocaleString()}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
}
