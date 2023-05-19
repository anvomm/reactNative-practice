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
import { db } from "../../firebase/config";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (_, thunkAPI) => {
    try {
      const posts = await getDocs(collection(db, "posts"));
      const allPosts = posts.docs.map((doc) => doc.data());
      return allPosts;
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
      return post;
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
