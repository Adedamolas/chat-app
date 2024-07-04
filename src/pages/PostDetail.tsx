import { useContext } from "react";
import { AppContext } from "../helpers/Context";
import {
  RiFacebookBoxLine,
  RiTwitterLine,
  RiWhatsappLine,
} from "@remixicon/react";
import { Post } from "../types/types";
import Loader from "../loader/Loader";
import React from "react";

// interface Props {
//   postDetail: Post | null;
// }
export default function () {
  const {loading} = useContext(AppContext)
    if (loading) {
      return (
        <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
          <Loader />
        </div>
      );
    }
  return (
    <section className=" flex flex-col space-y-10 w-full items-center justify-center">
      {/* <div className=" flex flex-col space-y-7 w-[50vw]">
        <h3>{postDetail.niche}</h3>
        <h2>{postDetail.title}</h2>
        <div>
          <div>
            <img
              className=" w-[50px] rounded-full"
              src={postDetail.author.profile_image ?? undefined}
              alt="profile pic"
            />
            {postDetail.author.name}
          </div>
          <div>
            <h4>{new Date(postDetail.createdAt).toLocaleString()}</h4>
          </div>
        </div>
        <div>
          <RiFacebookBoxLine />
          <RiWhatsappLine />
          <RiTwitterLine />
        </div>
      </div>
      <div>
        <img
          className=" w-[50px] rounded-full"
          src={postDetail.imageUrl ?? undefined}
          alt="profile pic"
        />
      </div> */}
    </section>
  );
}
