import { createSlice } from "@reduxjs/toolkit";

export const PostSlice = createSlice({
    name: "Posts",
    initialState: {
        allPosts: []
    },
    reducers: {
        setPost: (state, action) => {
            state.allPosts = action.payload;
        },
        addPost: (state, action) => {
            state.allPosts.push(action.payload);
        },
        removePost: (state, action) => {
            state.allPosts = state.allPosts.filter((item) => item.id !== action.payload);
        },
        updatePost: (state, action) => {
            state.allPosts = state.allPosts.map((item) => item.id === action.payload.id ? action.payload : item);
        }
    }
});

export const {
    setPost,
    addPost,
    removePost,
    updatePost
} = PostSlice.actions;

export default PostSlice.reducer;
