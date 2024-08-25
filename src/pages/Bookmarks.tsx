import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { Post } from "../types/types";
import { auth, db } from "../firebase-config";
import Loader from "../loader/Loader";
import TruncatedText from "../reusables/TruncateText";

const Bookmarks: React.FC = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchBookmarkedPosts = async () => {
     try {
       const uid = auth.currentUser?.uid;
       if (uid) {
         const postsCollectionRef = collection(db, "posts");
         const q = query(
           postsCollectionRef,
           where("bookmarkedBy", "array-contains", uid)
         );
         const snapshot = await getDocs(q);

         const postsList = snapshot.docs.map((doc) => ({
           id: doc.id,
           ...doc.data(),
         })) as Post[];

         setBookmarkedPosts(postsList);
       }
     } catch (error) {
       console.error("Error fetching bookmarked posts:", error);
     } finally {
       setLoading(false);
     }
   };

   fetchBookmarkedPosts();
 }, []);

  if (loading) {
    return (
      <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
        <Loader />
      </div>
    );
  }

  if (bookmarkedPosts.length < 0) {
    return (
      <div className=" flex flex-row items-center justify-center py-10 w-full">
        <div className=" w-full flex flex-col items-center justify-center">
          <img
            className=" size-[28rem]"
            src="/empty_illustration.svg" // Replace with your actual illustration path
            alt="No bookmarks"
          />
          <p>You haven't bookmarked any posts yet.</p>
        </div>
      </div>
    );
  }
  return (
    <div className=" flex flex-col w-full items-center justify-center py-20">
      <div className=" w-3/4">
        <h2>Your Bookmarks</h2>
        <div className=" flex flex-col space-y-5">
          <ul>
            {bookmarkedPosts.map((post : Post) => (
              <div className=" flex flex-row space-x-2 p-5 items-center">
                <div
                  className=" bg-center bg-cover w-72 h-56 rounded-xl relative"
                  style={{ backgroundImage: `url(${post.imageUrl})` }}
                ></div>
                <li key={post.id} className=" flex flex-col spaxe-y-3">
                  <h4 className=" text-xl font-bold">{post.title}</h4>
                  <p className=" w-1/2 text-sm">
                    <TruncatedText text={post.postText} maxLength={300} />
                  </p>
                  <p>
                    <strong>Author:</strong> {post.author.name}
                  </p>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
