import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getDocs,
  doc,
  addDoc,
  updateDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { db } from "../../firebase/config";
import { storage } from "../../firebase/config";

export const fetchAllPosts = createAsyncThunk(
    "posts/fetchAllPosts",
    async (_, thunkAPI) => {
      try {
        const posts = await getDocs(collection(db, "posts"));
      const allPosts = posts.docs.map(async (doc) => {
        const post = doc.data();
        const updatedComments = await Promise.all(
          post.comments.map(async (comment) => {
            const imageRef = ref(storage, `avatars/${comment.user}.jpg`);
            const downloadURL = await getDownloadURL(imageRef);
            return { ...comment, userAvatar: downloadURL };
          })
        );
        return { ...post, comments: updatedComments };
      });

      const updatedPosts = await Promise.all(allPosts);

      return updatedPosts;

      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (post, thunkAPI) => {
    try {
      const newPost = await addDoc(collection(db, "posts"), { ...post });
      await updateDoc(newPost, { uid: newPost.id });

      const response = await fetch(post.image);

      const blob = await response.blob();

      const storageRef = ref(storage, "images/" + `${newPost.id}.jpg`);
      const uploadTask = uploadBytesResumable(storageRef, blob, {
        contentType: "image/jpeg",
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              break;
            case "storage/canceled":
              break;
            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            updateDoc(newPost, { image: downloadURL });
          });
        }
      );

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addCommentToPost = createAsyncThunk(
  "posts/addCommentToPost",
  async ({ comment, id }, thunkAPI) => {
    try {
      const postQuery = query(collection(db, "posts"), where("id", "==", id));
      const postSnapshot = await getDocs(postQuery);
      const postDoc = postSnapshot.docs[0];
      const postRef = doc(db, "posts", postDoc.id);
      const postData = postDoc.data();
      const updatedComments = [...(postData.comments || []), comment];

      await updateDoc(postRef, { comments: updatedComments });
      return { updatedComments, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addLikeToPost = createAsyncThunk(
  "posts/addLikeToPost",
  async ({ user, id }, thunkAPI) => {
    try {
      const postQuery = query(collection(db, "posts"), where("id", "==", id));
      const postSnapshot = await getDocs(postQuery);
      const postDoc = postSnapshot.docs[0];
      const postRef = doc(db, "posts", postDoc.id);
      const postData = postDoc.data();
      const updatedLikes = [...(postData.likes || []), user];

      await updateDoc(postRef, { likes: updatedLikes });
      return { updatedLikes, id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
