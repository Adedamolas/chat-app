import { doc } from 'firebase/firestore';
const { getFirestore } = require("firebase-admin/firestore");
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const db = getFirestore();

const updateExistingPosts = async () => {
  const postsCollection = db.collection("posts");
  const snapshot = await postsCollection.get();

  const batch = db.batch();

  snapshot.forEach((doc: { data: () => any; id: any; }) => {
    const postData = doc.data();
    const updatedPost = {
      ...postData,
      comments: postData.comments || [],
      likes: postData.likes || [],
    };

    const postRef = postsCollection.doc(doc.id);
    batch.update(postRef, updatedPost);
  });

  await batch.commit();
  console.log("All posts updated with comments and likes fields");
};

updateExistingPosts().catch(console.error);
