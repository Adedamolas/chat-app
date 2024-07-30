// Hooks
import { useContext, useEffect, useState } from "react";

// Firebase
import { db, storage } from "../firebase-config";
import { deleteObject, ref } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

// Components
import Loader from "../loader/Loader";
import Header from "../components/Header";
import Posts from "../components/Posts";

// Reusables
import { AppContext } from "../helpers/Context";
import Advert from "../components/Advert";
import NichePosts from "./NichePosts";
import Niche from "../components/Niche";
import { Post } from "../types/types";

export default function Home()  {
  const { randomPost, loading } = useContext(AppContext);
  // const [loading, setLoading] = useState<boolean>(true);
  if (loading) {
    return (
      <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20 pt-52 sm:pt-0 space-y-10">
      <>
        <Header randomPost={randomPost} />
      </>
      <>
        <Advert title="Advertisment" content="You can place ads here" />
      </>
      <>
        <Niche />
      </>
      <>
        <Advert title="Advertisment" content="You can place ads here" />
      </>
      <section className="flex flex-col items-center">
        <h3 className=" border-b-2 border-black">Editor's Picks</h3>
        <Posts />
      </section>
      <>
        <Advert title="Advertisment" content="You can place ads here" />
      </>
    </div>
  );
}
