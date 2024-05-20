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

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
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
    setLoading(true)
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
            setLoading(false)
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
      });
      navigate("/");
      setLoading(false)
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };
  return (
    <div className=" w-full h-full flex flex-col align-middle justify-center place-items-center py-20">
      <h3>Create-Post</h3>
      <div className=" flex flex-col gap-5 items-start justify-center">
        <label htmlFor="Title">Title</label>
        <input
          required
          placeholder="Title"
          type="text"
          onChange={(event) => setTitle(event.target.value)}
        />
        <label htmlFor="post">Text</label>
        <textarea
          required
          placeholder="Type in text"
          onChange={(event) => setPostText(event.target.value)}
        />
        <div className=" flex flex-col items-start space-y-3">
          <label htmlFor="image"> Submit Image </label>
          <input
            required
            type="file"
            placeholder="Drop files here"
            onChange={handleFileChange}
          />
        </div>
        <button onClick={createPost} disabled={loading}>
          {uploading ? "Creating Post" : "Submit"}
        </button>
      </div>
    </div>
  );
}
