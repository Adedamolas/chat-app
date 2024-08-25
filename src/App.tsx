import { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
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
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  runTransaction,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import Loader from "./loader/Loader";
import { Authors, UserProfileProps } from "./types/types";
import Author from "./pages/Author";
import Stories from "./pages/Stories";
import Footer from "./components/Footer";
import PostDetail from "./pages/PostDetail";
import MyPosts from "./pages/MyPosts";
import { followUser, unfollowUser } from "./reusables/followUnfollow";
import { FollowersList } from "./components/Follow";
import Settings from "./pages/Settings";
import NichePosts from "./pages/NichePosts";
import { Switch } from "@headlessui/react";
import { getUserBookmarks, toggleBookmark } from "./types/bookmarkService";
import Bookmarks from "./pages/Bookmarks";
import { ToastContainer } from "react-toastify";
import ToastNotification from "./reusables/ToastNotification";

interface Post {
  id: string;
  title: string;
  postText: string;
  author: {
    name: string;
    id: string;
    profile_image: string | null;
  };
  imageUrl?: string;
  createdAt: Date;
  niche: string;
  comments: [
    {
      userId: string;
      userName: string;
      comment: string;
      createdAt: Date;
    }
  ];
  likes: string[];
  postId: string;
  userId: string;
  bookmarkedBy: string[];
}
export default function App() {
  // Auth for user
  const [isAuth, setIsAuth] = useLocalStorageBoolean("isAuth", false);

  // Posts array
  const [posts, setPosts] = useState<Post[]>([]);

  // State for user posts
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  // State for the post on the header
  const [randomPost, setRandomPost] = useState<Post | null>(null);

  // State for the existing authors
  const [authors, setAuthors] = useState<Authors[]>([]);

  // Loading state for loading for preloader
  const [loading, setLoading] = useState<boolean>(true);

  // State for the post-detail
  const [postDetail, setPostDetail] = useState<Post | null>(null);

  const { postId } = useParams<{ postId: string }>();

  // State for following users
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  // State for storing the theme
  const [theme, setTheme] = useState<boolean>(false);

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const [submitting, setSubmitting] = useState<boolean>(false);

  // const [isLiked, setIsLiked] = useState<boolean>(false);

  const [isPostDeleted, setIsPostDeleted] = useState<boolean>(false);

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const [nickName, setNickName] = useState<string>("");
  // variable for the maxLength for the post titles
  const maxLength = 10;

  // Function for signing users out
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };
  // console.log(isAuth);

  // Function for signing users in with Google popup
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

  // State fo fetching all published posts
  useEffect(() => {
    const postsCollectionRef = collection(db, "posts");

    const unsubscribe = onSnapshot(postsCollectionRef, (snapshot) => {
      const postsList = snapshot.docs.map((doc) => {
        const data = doc.data();
        const comments = (data.comments || []).map((comment: any) => ({
          ...comment,
          createdAt:
            comment.createdAt instanceof Timestamp
              ? comment.createdAt.toDate()
              : comment.createdAt,
        }));
        return {
          id: doc.id,
          ...data,
          createdAt: (data.createdAt as Timestamp).toDate(),
          comments,
          likes: data.likes || [],
          bookmarkedBy: data.bookmarkedBy || [], // <-- Handling bookmarks
        };
      }) as Post[];

      setPosts(postsList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (postId) {
      const postDetailDocRef = doc(db, "posts", postId);

      const unsubscribe = onSnapshot(postDetailDocRef, (doc) => {
        if (doc.exists()) {
          setPostDetail({ id: doc.id, ...doc.data() } as Post);
        } else {
          console.log("No such document!");
        }
      });

      // Clean up the subscription
      return () => unsubscribe();
    }
  }, [postId]);

  // For fetching user posts
  useEffect(() => {
    // if (auth.currentUser) {
    const fetchUserPosts = async () => {
      const q = query(
        collection(db, "posts"),
        where("author.id", "==", auth.currentUser?.uid)
      );
      const querySnapshot = await getDocs(q);
      const userPosts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: (data.createdAt as Timestamp).toDate(),
        };
      }) as Post[];
      setUserPosts(userPosts);
      setLoading(false);
    };

    fetchUserPosts();
  }, [db]);

  // FUNCTION FOR FETCHING THE LIST OF AUTHORS
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
  }, [3000]);

  //FETCH POST WHICH IS CLICKED ON
  useEffect(() => {
    console.log("POST ID:", postId);
    const fetchPost = async () => {
      if (postId) {
        const postDetailDocRef = doc(db, "posts", postId);
        const postDoc = await getDoc(postDetailDocRef);

        if (postDoc.exists()) {
          setPostDetail({ id: postDoc.id, ...postDoc.data() } as Post);
        } else {
          console.log("no such document boss");
        }
      }
    };
    fetchPost();
    console.log(postDetail);
  }, [postId]);

  // const handleDelete
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

  const handleLike = async (postId: string) => {
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    const userId = auth.currentUser.uid;
    const postRef = doc(db, "posts", postId);
    const post = posts.find((p) => p.id === postId);

    if (!post) {
      console.error("Post not found");
      return;
    }

    try {
      if (post.likes.includes(userId)) {
        await updateDoc(postRef, {
          likes: arrayRemove(userId),
        });

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likes: post.likes.filter((id) => id !== userId) }
              : post
          )
        );
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(userId),
        });

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { ...post, likes: [...post.likes, userId] }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error updating likes: ", error);
    }
  };

  const handleAddComment = async (postId: string, commentText: string) => {
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    setSubmitting(true);
    const postRef = doc(db, "posts", postId);
    const newComment = {
      userId: auth.currentUser?.uid || "",
      userName: auth.currentUser?.displayName || "Anonymous",
      profileImage: auth.currentUser?.photoURL || "",
      comment: commentText,
      createdAt: new Date(),
    };
    try {
      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });
    } catch (error) {
      console.error("Error adding comment: ", error);
    }

    setSubmitting(false);
  };

  const handleDeleteComment = async (postId: string, comment: any) => {
    if (!auth.currentUser) {
      console.error("User is not authenticated.");
      return;
    }

    const postRef = doc(db, "posts", postId);

    try {
      await updateDoc(postRef, {
        comments: arrayRemove(comment),
      });
    } catch (error) {
      console.log("Error deleting comment: ", error);
    }
  };

  const setNickname = async (userId: string, nickname: string) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        nickname: nickname,
      });
      console.log("Nickname updated successfully.");
    } catch (error) {
      console.error("Error updating nickname:", error);
    }
  };

  console.log(nickName);

  const handleBookmark = async (postId: string) => {
    if (!auth.currentUser) return;

    const userId = auth.currentUser.uid;
    const postRef = doc(db, "posts", postId);

    try {
      await runTransaction(db, async (transaction) => {
        const postDoc = await transaction.get(postRef);
        if (!postDoc.exists()) {
          throw "Post does not exist!";
        }

        const postData = postDoc.data();
        const bookmarkedBy = postData.bookmarkedBy || [];

        if (bookmarkedBy.includes(userId)) {
          // If already bookmarked, remove the bookmark
          transaction.update(postRef, {
            bookmarkedBy: arrayRemove(userId),
          });
        } else {
          // If not bookmarked, add the bookmark
          transaction.update(postRef, {
            bookmarkedBy: arrayUnion(userId),
          });
        }
      });
    } catch (e) {
      console.error("Bookmark failed: ", e);
    }

    <ToastNotification
      message="Post bookmarked!"
      duration={3000}
      backgroundColor="green"
    />;
  };

  //   const toggleBookmark = async (userId: string, postId: string, isBookmarked: boolean) => {
  //   const userRef = doc(db, 'users', userId);
  //   if (isBookmarked) {
  //     // Remove bookmark
  //     await updateDoc(userRef, {
  //       bookmarks: arrayRemove(postId)
  //     });
  //   } else {
  //     // Add bookmark
  //     await updateDoc(userRef, {
  //       bookmarks: arrayUnion(postId)
  //     });
  //   }
  // };

  // const getUserBookmarks = async (userId: string) => {
  //   const userRef = doc(db, "users", userId);
  //   const userDoc = await getDoc(userRef);
  //   if (userDoc.exists()) {
  //     return userDoc.data().bookmarks || [];
  //   }
  //   return [];
  // };

  // useEffect(() => {
  //   const fetchBookmarks = async (userId: string) => {
  //     const bookmarks = await getUserBookmarks();userId
  //     setIsBookmarked(bookmarks.includes(postId));
  //   };
  //   fetchBookmarks();
  // }, [postId, userId]);

  // const handleBookmarkClick = async () => {
  //   await toggleBookmark(userId, postId, isBookmarked);
  //   setIsBookmarked(!isBookmarked);
  // };

  const openModal = (post: Post) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };
  const handleFollow = async ({
    currentUserId,
    targetUserId,
  }: UserProfileProps) => {
    await followUser(currentUserId, targetUserId);
    setIsFollowing(true);
  };

  const handleUnFollow = async ({
    currentUserId,
    targetUserId,
  }: UserProfileProps) => {
    await unfollowUser(currentUserId, targetUserId);
    setIsFollowing(false);
  };

  // if (loading) {
  //   return (
  //     <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center items-center py-20">
  //       <Loader />
  //     </div>
  //   );
  // }
  return (
    <AppContext.Provider
      value={{
        isAuth,
        signUserOut,
        randomPost,
        posts,
        userPosts,
        deletePost,
        maxLength,
        authors,
        loading,
        setLoading,
        postDetail,
        setPostDetail,
        isFollowing,
        theme,
        setTheme,
        openModal,
        closeModal,
        selectedPost,
        setSelectedPost,
        handleLike,
        handleAddComment,
        handleDeleteComment,
        handleBookmark,
        submitting,
        isPostDeleted,
        setIsPostDeleted,
        isBookmarked,
        setIsBookmarked,
        toggleBookmark,
        nickName,
        setNickName,
      }}
    >
      <main className=" bg-white text-black h-max">
        <Navbar isAuth={isAuth} signUserOut={signUserOut} />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/create-post" element={<CreatePost />} />
            {/* <Route path="/posts" element={<Stories />} /> */}
            <Route path="/authors" element={<Author />} />
            <Route path="/userposts" element={<MyPosts />} />
            <Route path="/followers" element={<FollowersList />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/niche/:niche" element={<NichePosts />} />{" "}
            <Route
              path="/login"
              element={<Login signInWithGoogle={signInWithGoogle} />}
            />
            <Route
              path="/register"
              element={<Register signInWithGoogle={signInWithGoogle} />}
            />
          </Routes>
        </Router>
        <section className=" mt-[10%]">
          <Footer />
        </section>
      </main>
    </AppContext.Provider>
  );
}
