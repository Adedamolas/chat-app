import { useEffect, useState } from "react";
import { Post } from "../types/types";
import CapitalizeWords from "../reusables/CapitalizeWords";
import TruncatedText from "../reusables/TruncateText";

interface Props {
  randomPost: Post | null
}

export default function Header({ randomPost }: Props) {
  const maxLength = 25;
  return (
    <>
      {randomPost && (
        <div
          className=" bg-no-repeat bg-cover bg-top flex flex-row justify-start px-10 items-end h-[40vh] sm:h-[70vh] w-[80vw] rounded-2xl relative mt-24 mb-60 sm:mb-20"
          style={{ backgroundImage: `url(${randomPost.imageUrl})` }}
        >
          <div className=" bg-white text-black sm:w-1/2 h-fit sm:h-min p-6 rounded-2xl space-y-2 shadow-blue-100 drop-shadow-lg absolute sm:-bottom-16 -bottom-56 sm:left-10 left-0 w-full">
            <h2 className=" text-gray-400 sm:text-2xl text-lg">
              FEATURED ARTICLE
            </h2>
            <h4 className=" bg-black text-white p-2 rounded-md w-min">
              <CapitalizeWords text={randomPost.niche} />{" "}
            </h4>
            <h2 className=" font-extrabold">
              {" "}
              <TruncatedText text={randomPost.title} maxLength={maxLength} />
            </h2>
            {/* <h4 className=" text-gray-400"> {randomPost.author.name} </h4> */}
            {/* <p>{randomPost.postText}</p> */}
            <div className=" flex flex-row space-x-2 items-center">
              <img
                className=" w-[50px] rounded-full"
                src={randomPost.author.profile_image ?? undefined}
                alt="profile pic"
              />
              <p> {randomPost.author.name} </p>
              <p>{new Date(randomPost.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
