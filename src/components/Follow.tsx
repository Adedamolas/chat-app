import React, { useEffect, useState } from "react";
import {
  followUser,
  unfollowUser,
  useFollowers,
  useFollowing,
} from "../types/types";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
// import { useFollowers, useFollowing } from "./yourHooksFile"; // Replace with the actual path
// import { auth } from "./firebase-config";

export const FollowersList = () => {
  const followers = useFollowers(auth.currentUser?.uid || "");

  return (
    <div>
      <h2>Your Followers</h2>
      <ul>
        {followers.map((followerId) => (
          <li key={followerId}>{followerId}</li>
        ))}
      </ul>
    </div>
  );
};

export const FollowingList = () => {
  const following = useFollowing(auth.currentUser?.uid || "");

  return (
    <div>
      <h2>Following</h2>
      <ul>
        {following.map((followingId) => (
          <li key={followingId}>{followingId}</li> // Replace with user details fetching
        ))}
      </ul>
    </div>
  );
};

export const FollowButton = ({ targetUserId }: { targetUserId: string }) => {
  const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setIsFollowing(userDoc.data().following.includes(targetUserId));
        }
      }
    };

    checkFollowingStatus();
  }, [targetUserId]);

  const handleFollow = async () => {
    if (auth.currentUser) {
      await followUser(auth.currentUser.uid, targetUserId);
      setIsFollowing(true);
    }
  };

  const handleUnfollow = async () => {
    if (auth.currentUser) {
      await unfollowUser(auth.currentUser.uid, targetUserId);
      setIsFollowing(false);
    }
  };

  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};
