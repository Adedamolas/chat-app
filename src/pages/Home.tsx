import { collection, deleteDoc, doc, getDocs, Timestamp } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase-config";
import { AppContext } from "../helpers/Context";
import { RiDeleteBinLine } from "@remixicon/react";
import { deleteObject, ref } from "firebase/storage";
import Loader from "../loader/Loader";

interface Post {
  id: string;
  title: string;
  postText: string;
  author: {
    name: string;
    id: string;
    profile_image: string | null;
  };
  imageUrl: string;
  createdAt: Date;
}

export default function Home() {
  const { isAuth } = useContext(AppContext);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollectionRef = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollectionRef);
      const postsList = postsSnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: (data.createdAt as Timestamp).toDate(), // Convert Firestore Timestamp to JavaScript Date
        };
      }) as Post[];
      setPosts(postsList);
      setLoading(false);
    };

    fetchPosts();
  }, []);
  const deletePost = async (postId: string, imageUrl: string) => {
    try {
      // Delete the post document from Firestore
      await deleteDoc(doc(db, "posts", postId));

      // Optionally, delete the associated image from Firebase Storage
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      // Remove the deleted post from the state
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  if (loading) {
    return (
      <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center pt-28 space-y-10">
      <div className=" bg-hero-pattern bg-no-repeat bg-cover flex flex-row justify-start px-10 py-10 items-start w-full h-full">
        <div className=" bg-white text-black w-1/2 p-6 rounded-md">
          <h2 className=" text-gray-400">FEATURED ARTICLE</h2>
          <h2 className=" font-extrabold">
            {" "}
            World’s Most Dangerous Technology Ever Made.{" "}
          </h2>
          <h4 className=" text-gray-400"> Adedamola Samuel </h4>
          <p>
            Proident aliquip velit qui commodo officia qui consectetur dolor
            ullamco aliquip elit incididunt. Ea minim ex consectetur excepteur.
            Ex laborum nostrud mollit sint consectetur Lorem amet aliqua do
            enim. Commodo duis dolor anim excepteur. In aliquip mollit nulla
            consequat velit magna.
          </p>
        </div>
      </div>
      <h3 className=" border-b-2 border-black">Editor's Picks</h3>
      <div className=" flex flex-col grid-cols-1 w-full justify-center place-items-center align-middle items-center space-y-7">
        {posts.map((post) => {
          return (
            <div
              key={post.id}
              className=" flex flex-row gap-5 text-left w-3/4 items-center border-b-2 border-black py-4"
            >
              <div>
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className=" rounded-md max-w-[250px] max-h-[250px]"
                  />
                )}
              </div>
              <div className=" flex flex-col items-start space-y-2">
                <div className=" flex flex-row justify-between items-center w-fit space-x-10">
                  <h2 className=" font-bold">{post.title} </h2>
                  {isAuth && post.author.id === auth.currentUser?.uid && (
                    <button
                      onClick={() => {
                        deletePost(post.id, post.imageUrl);
                      }}
                    >
                      <RiDeleteBinLine />
                    </button>
                  )}
                </div>
                <h4 className=" font-medium text-gray-500">
                  @{post.author.name}
                </h4>
                <p>{post.postText}</p>
                <p>Posted at: {new Date(post.createdAt).toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
