import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import Loader from "../loader/Loader";
import { AppContext } from "../helpers/Context";
import { RiInformation2Line, RiInformationLine } from "@remixicon/react";
import Info from "../reusables/Info";
import Spinner from "../loader/Spinner"
import "../App.css"

export default function CreatePost() {
  const navigate = useNavigate();

  const { isAuth } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [niche, setNiche] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const postsCollectionRef = collection(db, "posts");
  const imageListRef = ref(storage, "images/");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageUpload(event.target.files[0]);
    }
  };

  const createPost = async () => {
    if (!auth.currentUser) {
      console.error("No authenticated user found");
      return;
    }
    if (!title) {
      return (
        <>
          <p>Write something first baba.</p>
        </>
      );
    }
    setLoading(true);
    let imageUrl = "";

    if (imageUpload) {
      const imageRef = ref(storage, `images/${imageUpload.name}`);
      const uploadTask = uploadBytesResumable(imageRef, imageUpload);

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
          },
          (error) => {
            console.error("Image upload failed:", error);
            reject(error);
            setUploading(false);
            setLoading(false);
          },
          async () => {
            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
            setUploading(false);
          }
        );
      });
    }

    try {
      await addDoc(postsCollectionRef, {
        title,
        postText,
        imageUrl,
        author: {
          name: auth.currentUser?.displayName,
          id: auth.currentUser?.uid,
          profile_image: auth.currentUser?.photoURL,
        },
        createdAt: new Date(),
        niche,
        comments: [],
        likes: [],
      });
      navigate("/");
      setLoading(true);
    } catch (error) {
      console.error("Error adding document:", error);
    } finally {
      setUploading(false);
    }
  };

  if (!isAuth) {
    navigate("/login");
  }
  // console.log(title)

  if (loading) {
    return (
      <div className=" w-full h-full flex flex-col gap-3 align-middle justify-center place-items-center items-center py-28">
        {/* <img
          src="https://tenor.com/view/kakaotalk-ompangie-emoticon-pentol-writing-gif-18260388.gif"
          alt="gif"
        /> */}
        <img
          className=" bg-black"
          src="https://tenor.com/view/just-write-i-am-writing-must-write-tappity-tap-time-to-write-gif-1858595896619860480.gif"
          alt=""
        />
        <div className=" flex flex-col justify-center items-center gap-2">
          <h2 className=" font-bold">Creating Post.... </h2>
          <p className=" text-xl px-2 w-fit h-min rounded-lg">
            Uploading: {Math.round(progress)}%
          </p>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        {loading ? (
          ""
        ) : (
          <button className="" onClick={createPost} disabled={loading}>
            Submit
          </button>
        )}
      </div>
    );
  }
  return (
    <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center py-48 sm:py-32 items-center">
      <h3 className=" font-bold md:w-fit w-[%]">
        {" "}
        Create your un-filtered post.{" "}
      </h3>
      <form
        onSubmit={createPost}
        className=" flex flex-col gap-5 items-start text-start justify-center place-items-center pl-16"
      >
        <label htmlFor="Title">Title</label>
        <input
          required
          placeholder="Title"
          type="text"
          onChange={(event) => setTitle(event.target.value)}
        />
        <Info text="Make it a good one" />
        <label htmlFor="post">Text</label>
        <textarea
          required
          placeholder="Type in text"
          onChange={(event) => setPostText(event.target.value)}
        />
        <Info text="Must not exceed 1000 words... or something" />
        <label htmlFor="Niche">Niche</label>
        <div className=" flex flex-col gap-5 bg-transparent p-2 rounded-lg">
          <select
            value={niche}
            required
            onChange={(e) => setNiche(e.target.value)}
            className=" px-2 py-2 border-black border-2 rounded-md"
          >
            <option value="">Select Niche</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Personal">Personal</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <div className=" flex flex-col items-start space-y-3">
          <label htmlFor="image"> Submit Image </label>
          <input
            required
            type="file"
            placeholder="Drop files here"
            onChange={handleFileChange}
          />
          <Info text="Ensure image is landscape for best experience" />
        </div>
        <button onClick={createPost} disabled={loading}>
          {uploading ? "Creating Post" : "Submit"}
        </button>
      </form>
    </div>
  );
}
