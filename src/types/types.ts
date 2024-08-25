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
  bookmarkedBy: string[];
  // userName: ReactNode;
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



//import React, { useState, useEffect } from 'react';

// interface Suggestion {
//   title: string;
//   description: string;
//   time: string;
//   votes: number;
//   category: string;
//   urgency: string;
//   status: string;
// }

// const suggestionsData: Suggestion[] = [
//   {
//     title: "Example Title 1",
//     description: "This is a description for the first example.",
//     time: "4 days ago",
//     votes: 10,
//     category: "infrastructure",
//     urgency: "medium",
//     status: "open"
//   },
//   {
//     title: "Example Title 2",
//     description: "This is a description for the second example.",
//     time: "2 days ago",
//     votes: 15,
//     category: "academics",
//     urgency: "high",
//     status: "in progress"
//   },
//   {
//     title: "Example Title 3",
//     description: "This is a description for the third example.",
//     time: "1 day ago",
//     votes: 5,
//     category: "campus life",
//     urgency: "low",
//     status: "closed"
//   },
//   {
//     title: "Example Title 4",
//     description: "This is a description for the fourth example.",
//     time: "3 days ago",
//     votes: 20,
//     category: "infrastructure",
//     urgency: "high",
//     status: "open"
//   }
// ];

// const TopSuggestions: React.FC = () => {
//   const [topSuggestions, setTopSuggestions] = useState<Suggestion[]>([]);

//   useEffect(() => {
//     const sortedSuggestions = suggestionsData.sort((a, b) => b.votes - a.votes);
//     setTopSuggestions(sortedSuggestions.slice(0, 3));
//   }, []);

//   return (
//     <div>
//       <h2>Top 3 Suggestions</h2>
//       <ul>
//         {topSuggestions.map((suggestion, index) => (
//           <li key={index}>
//             <h3>{suggestion.title}</h3>
//             <p>{suggestion.description}</p>
//             <p>Votes: {suggestion.votes}</p>
//             <p>Category: {suggestion.category}</p>
//             <p>Urgency: {suggestion.urgency}</p>
//             <p>Status: {suggestion.status}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default TopSuggestions;



//

// import React, { useState, useEffect } from "react";

// interface Suggestion {
//   title: string;
//   description: string;
//   time: string;
//   votes: number;
//   category: string;
//   urgency: string;
//   status: string;
// }

// const suggestionsData: Suggestion[] = [
//   {
//     title: "Example Title 1",
//     description: "This is a description for the first example.",
//     time: "4 days ago",
//     votes: 10,
//     category: "infrastructure",
//     urgency: "medium",
//     status: "open",
//   },
//   {
//     title: "Example Title 2",
//     description: "This is a description for the second example.",
//     time: "2 days ago",
//     votes: 15,
//     category: "academics",
//     urgency: "high",
//     status: "in progress",
//   },
//   {
//     title: "Example Title 3",
//     description: "This is a description for the third example.",
//     time: "1 day ago",
//     votes: 5,
//     category: "campus life",
//     urgency: "low",
//     status: "closed",
//   },
//   {
//     title: "Example Title 4",
//     description: "This is a description for the fourth example.",
//     time: "3 days ago",
//     votes: 20,
//     category: "infrastructure",
//     urgency: "high",
//     status: "open",
//   },
// ];

// const TopSuggestions: React.FC = () => {
//   const [filteredSuggestions, setFilteredSuggestions] =
//     useState<Suggestion[]>(suggestionsData);
//   const [filter, setFilter] = useState({
//     category: "",
//     urgency: "",
//     status: "",
//   });

//   useEffect(() => {
//     let filtered = suggestionsData;

//     if (filter.category) {
//       filtered = filtered.filter(
//         (suggestion) => suggestion.category === filter.category
//       );
//     }

//     if (filter.urgency) {
//       filtered = filtered.filter(
//         (suggestion) => suggestion.urgency === filter.urgency
//       );
//     }

//     if (filter.status) {
//       filtered = filtered.filter(
//         (suggestion) => suggestion.status === filter.status
//       );
//     }

//     setFilteredSuggestions(filtered);
//   }, [filter]);

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilter({
//       ...filter,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const getUrgencyColor = (urgency: string) => {
//     switch (urgency) {
//       case "high":
//         return "text-red-500";
//       case "medium":
//         return "text-yellow-500";
//       case "low":
//         return "text-green-500";
//       default:
//         return "";
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "open":
//         return "text-blue-500";
//       case "in progress":
//         return "text-orange-500";
//       case "closed":
//         return "text-gray-500";
//       default:
//         return "";
//     }
//   };

//   return (
//     <div>
//       <h2>Suggestions</h2>
//       <div className="mb-4">
//         <label className="block mb-2">
//           Category:
//           <select
//             name="category"
//             onChange={handleFilterChange}
//             className="ml-2 p-1 border rounded"
//           >
//             <option value="">All</option>
//             <option value="infrastructure">Infrastructure</option>
//             <option value="academics">Academics</option>
//             <option value="campus life">Campus Life</option>
//           </select>
//         </label>
//         <label className="block mb-2">
//           Urgency:
//           <select
//             name="urgency"
//             onChange={handleFilterChange}
//             className="ml-2 p-1 border rounded"
//           >
//             <option value="">All</option>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </label>
//         <label className="block mb-2">
//           Status:
//           <select
//             name="status"
//             onChange={handleFilterChange}
//             className="ml-2 p-1 border rounded"
//           >
//             <option value="">All</option>
//             <option value="open">Open</option>
//             <option value="in progress">In Progress</option>
//             <option value="closed">Closed</option>
//           </select>
//         </label>
//       </div>
//       <ul>
//         {filteredSuggestions.map((suggestion, index) => (
//           <li key={index} className="mb-4 p-4 border rounded shadow">
//             <h3 className="text-xl font-bold">{suggestion.title}</h3>
//             <p className="text-gray-700">{suggestion.description}</p>
//             <p className="text-sm text-gray-500">{suggestion.time}</p>
//             <p className={`text-lg ${getUrgencyColor(suggestion.urgency)}`}>
//               Urgency: {suggestion.urgency}
//             </p>
//             <p className={`text-lg ${getStatusColor(suggestion.status)}`}>
//               Status: {suggestion.status}
//             </p>
//             <p className="text-sm text-gray-500">Votes: {suggestion.votes}</p>
//             <p className="text-sm text-gray-500">
//               Category: {suggestion.category}
//             </p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TopSuggestions;



// ////
// import React, { useState, useEffect } from "react";

// interface Suggestion {
//   title: string;
//   description: string;
//   time: string;
//   votes: number;
//   category: string;
//   urgency: string;
//   status: string;
// }

// const suggestionsData: Suggestion[] = [
//   {
//     title: "Example Title 1",
//     description: "This is a description for the first example.",
//     time: "4 days ago",
//     votes: 10,
//     category: "infrastructure",
//     urgency: "medium",
//     status: "open",
//   },
//   {
//     title: "Example Title 2",
//     description: "This is a description for the second example.",
//     time: "2 days ago",
//     votes: 15,
//     category: "academics",
//     urgency: "high",
//     status: "in progress",
//   },
//   {
//     title: "Example Title 3",
//     description: "This is a description for the third example.",
//     time: "1 day ago",
//     votes: 5,
//     category: "campus life",
//     urgency: "low",
//     status: "closed",
//   },
//   {
//     title: "Example Title 4",
//     description: "This is a description for the fourth example.",
//     time: "3 days ago",
//     votes: 20,
//     category: "infrastructure",
//     urgency: "high",
//     status: "open",
//   },
// ];

// const TopSuggestions: React.FC = () => {
//   const [filteredSuggestions, setFilteredSuggestions] =
//     useState<Suggestion[]>(suggestionsData);
//   const [filter, setFilter] = useState({
//     category: "",
//     urgency: "",
//     status: "",
//   });

//   useEffect(() => {
//     let filtered = suggestionsData;

//     if (filter.category) {
//       filtered = filtered.filter(
//         (suggestion) => suggestion.category === filter.category
//       );
//     }

//     if (filter.urgency) {
//       filtered = filtered.filter(
//         (suggestion) => suggestion.urgency === filter.urgency
//       );
//     }

//     if (filter.status) {
//       filtered = filtered.filter(
//         (suggestion) => suggestion.status === filter.status
//       );
//     }

//     setFilteredSuggestions(filtered);
//   }, [filter]);

//   const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFilter({
//       ...filter,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div>
//       <h2>Suggestions</h2>
//       <div>
//         <label>
//           Category:
//           <select name="category" onChange={handleFilterChange}>
//             <option value="">All</option>
//             <option value="infrastructure">Infrastructure</option>
//             <option value="academics">Academics</option>
//             <option value="campus life">Campus Life</option>
//           </select>
//         </label>
//         <label>
//           Urgency:
//           <select name="urgency" onChange={handleFilterChange}>
//             <option value="">All</option>
//             <option value="low">Low</option>
//             <option value="medium">Medium</option>
//             <option value="high">High</option>
//           </select>
//         </label>
//         <label>
//           Status:
//           <select name="status" onChange={handleFilterChange}>
//             <option value="">All</option>
//             <option value="open">Open</option>
//             <option value="in progress">In Progress</option>
//             <option value="closed">Closed</option>
//           </select>
//         </label>
//       </div>
//       <ul>
//         {filteredSuggestions.map((suggestion, index) => (
//           <li key={index}>
//             <h3>{suggestion.title}</h3>
//             <p>{suggestion.description}</p>
//             <p>Votes: {suggestion.votes}</p>
//             <p>Category: {suggestion.category}</p>
//             <p>Urgency: {suggestion.urgency}</p>
//             <p>Status: {suggestion.status}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TopSuggestions;
