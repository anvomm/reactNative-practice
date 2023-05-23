import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createPost,
  fetchAllPosts,
  addLikeToPost,
  addCommentToPost,
} from "./postsOperations";

const initialState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addCase(addLikeToPost.fulfilled, (state, { payload }) => {
        const idx = state.posts.findIndex((post) => post.id === payload.id);
        state.posts[idx] = {
          ...state.posts[idx],
          likes: [...payload.updatedLikes],
        };
      })
      .addCase(addCommentToPost.fulfilled, (state, { payload }) => {
        const idx = state.posts.findIndex((post) => post.id === payload.id);
        state.posts[idx] = {
          ...state.posts[idx],
          comments: [...payload.updatedComments],
        };
      })

      .addMatcher(
        isAnyOf(fetchAllPosts.pending, createPost.pending),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(fetchAllPosts.fulfilled, createPost.fulfilled),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchAllPosts.rejected, createPost.rejected),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const postsReducer = postsSlice.reducer;
