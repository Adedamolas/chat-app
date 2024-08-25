import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

export const toggleBookmark = async (
  userId: string,
  postId: string,
  isBookmarked: boolean
) => {
  const userRef = doc(db, "users", userId);
  if (isBookmarked) {
    // Remove bookmark
    await updateDoc(userRef, {
      bookmarks: arrayRemove(postId),
    });
  } else {
    // Add bookmark
    await updateDoc(userRef, {
      bookmarks: arrayUnion(postId),
    });
  }
};

export const getUserBookmarks = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data().bookmarks || [];
  }
  return [];
};
