import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { Post } from "../types/types";
import Loader from "../loader/Loader";
import { db } from "../firebase-config";
import TruncatedText from "../reusables/TruncateText";

export default function NichePosts(){
  const { niche } = useParams<{ niche: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const maxLength = 18;
  
  useEffect(() => {
    if (niche) {
      const postsCollectionRef = collection(db, "posts");
      const q = query(postsCollectionRef, where("niche", "==", niche));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const nichePosts = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: (data.createdAt as Timestamp).toDate(),
          } as Post;
        });
        setPosts(nichePosts);
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [niche]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center py-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-28 px-28">
      <h1 className="text-2xl font-bold mb-6">Posts in " {niche} " Niche</h1>
      {posts.length === 0 ? (
        <p>No posts found in this niche, you can publish posts under this niche if you can.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className=" flex flex-col gap-5 text-left items-center py-4"
            >
              {post.imageUrl && (
                <div
                  className=" bg-center bg-cover w-72 h-56 rounded-xl relative"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                ></div>
              )}
              <div className=" flex flex-col items-start space-y-2 rounded-lg bg-gray-300 w-fit p-2 -translate-y-24 shadow-blue-500 drop-shadow-lg">
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
          ))}
        </div>
      )}
    </div>
  );
};