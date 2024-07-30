import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState } from "react";


export interface Comment {
  userId: string;
  userName: string;
  comment: string;
  profileImage?: string;
  createdAt: Date;
}

export interface Post {
  userName: ReactNode;
  id: string;
  title: string;
  postText: string;
  author: {
    profile_image: string;
    id: string;
    name: string;
  };
  imageUrl: string;
  niche: string;
  createdAt: string;
  comments: Comment[];
  likes: string[];
}

export interface Authors {
  id: string;
  name: string;
  profile_img: string | null;
}

export interface UserProfileProps {
  currentUserId: string;
  targetUserId: string;
}

export interface CommentsAndLikesProps {
  post: Post;
  handleAddComment: (postId: string, commentText: string) => void;
}


// Function to follow a user
export const followUser = async (
  currentUserId: string,
  targetUserId: string
) => {
  try {
    const currentUserRef = doc(db, "users", currentUserId);
    const targetUserRef = doc(db, "users", targetUserId);

    // Add targetUserId to currentUser's following array
    await updateDoc(currentUserRef, {
      following: arrayUnion(targetUserId),
    });

    // Add currentUserId to targetUser's followers array
    await updateDoc(targetUserRef, {
      followers: arrayUnion(currentUserId),
    });
  } catch (error) {
    console.error("Error following user: ", error);
  }
};

// Function to unfollow a user
export const unfollowUser = async (
  currentUserId: string,
  targetUserId: string
) => {
  try {
    const currentUserRef = doc(db, "users", currentUserId);
    const targetUserRef = doc(db, "users", targetUserId);

    // Remove targetUserId from currentUser's following array
    await updateDoc(currentUserRef, {
      following: arrayRemove(targetUserId),
    });

    // Remove currentUserId from targetUser's followers array
    await updateDoc(targetUserRef, {
      followers: arrayRemove(currentUserId),
    });
  } catch (error) {
    console.error("Error unfollowing user: ", error);
  }
};

export const useFollowers = (userId: string) => {
  const [followers, setFollowers] = useState<string[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setFollowers(userDoc.data().followers || []);
      }
    };

    fetchFollowers();
  }, [userId]);

  return followers;
};

export const useFollowing = (userId: string) => {
  const [following, setFollowing] = useState<string[]>([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        setFollowing(userDoc.data().following || []);
      }
    };

    fetchFollowing();
  }, [userId]);

  return following;
};
