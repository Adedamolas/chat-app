// followUnfollow.ts
import { db } from "../../src/firebase-config";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

const followUser = async (currentUserId: string, targetUserId: string) => {
  try {
    const currentUserRef = doc(db, "users", currentUserId);
    const targetUserRef = doc(db, "users", targetUserId);

    await updateDoc(currentUserRef, {
      following: arrayUnion(targetUserId),
    });

    await updateDoc(targetUserRef, {
      followers: arrayUnion(currentUserId),
    });
  } catch (error) {
    console.error("Error following user: ", error);
  }
};

const unfollowUser = async (currentUserId: string, targetUserId: string) => {
  try {
    const currentUserRef = doc(db, "users", currentUserId);
    const targetUserRef = doc(db, "users", targetUserId);

    await updateDoc(currentUserRef, {
      following: arrayRemove(targetUserId),
    });

    await updateDoc(targetUserRef, {
      followers: arrayRemove(currentUserId),
    });
  } catch (error) {
    console.error("Error unfollowing user: ", error);
  }
};

export { followUser, unfollowUser };
