import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Navbar";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { AppContext } from "./helpers/Context";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db, provider, storage } from "./firebase-config";
import useLocalStorageBoolean from "./helpers/useLocalStorageBoolean";
import Register from "./pages/Register";
import Posts from "./components/Posts";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Loader from "./loader/Loader";
import { Authors } from "./types/types";
import Author from "./pages/Author";
import Stories from "./pages/Stories";
import Footer from "./components/Footer";

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
  niche: string;
}
export default function App() {
  const [isAuth, setIsAuth] = useLocalStorageBoolean("isAuth", false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [randomPost, setRandomPost] = useState<Post | null>(null);
  const [authors, setAuthors] = useState<Authors[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const maxLength = 10;

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  console.log(isAuth);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", JSON.stringify(true));

      setIsAuth(true);
      window.location.pathname = "/";
    });
  };
  useEffect(() => {
    if (posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.length);
      setRandomPost(posts[randomIndex]);
    }
  }, [posts]);

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

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsCollectionRef = collection(db, "posts");
        const postsSnapshot = await getDocs(postsCollectionRef);

        if (postsSnapshot.empty) {
          console.log('No posts found in the "posts" collection.');
          setLoading(false);
          return;
        }

        const authorsSet = new Set<string>();
        const authorsList: Authors[] = [];

        postsSnapshot.docs.forEach((doc) => {
          const postData = doc.data();
          const author = postData.author;

          if (!authorsSet.has(author.id)) {
            authorsSet.add(author.id);
            authorsList.push({
              id: author.id,
              name: author.name,
              profile_img: author.profile_image,
            });
          }
        });

        setAuthors(authorsList);
        setLoading(false);
        console.log("Authors list:", authorsList); // Debug log
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
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
    <AppContext.Provider
      value={{
        isAuth,
        signUserOut,
        randomPost,
        posts,
        deletePost,
        maxLength,
        authors,
        loading,
        setLoading,
      }}
    >
      <main className=" bg-white text-black h-max">
        <Navbar isAuth={isAuth} signUserOut={signUserOut} />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/posts" element={<Stories />} />
            <Route path="/authors" element={<Author />} />
            <Route
              path="/LOGIN"
              element={<Login signInWithGoogle={signInWithGoogle} />}
            />
            <Route
              path="/register"
              element={<Register signInWithGoogle={signInWithGoogle} />}
            />
          </Routes>
        </Router>
        <Footer />
      </main>
    </AppContext.Provider>
  );
}
