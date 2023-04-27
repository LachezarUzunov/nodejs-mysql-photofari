import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentService from './commentService';

const initialState = {
    comments: [],
    isCommentError: false,
    isCommentSuccess: false,
    isCommentLoading: false,
    messageComment: ''
};

// Add new comment
export const addComment = createAsyncThunk('photo/comment',
    async(comment, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await commentService.addComment(comment, token)
        } catch (error) {
            const message = (error.response && error.data.response &&
                error.response.data.message) || error.messageComment ||
                error.toString();

                return thunkAPI.rejectWithValue(message)
        }   
    });


export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(addComment.pending, (state) => {
            state.isCommentLoading = true;
        })
        .addCase(addComment.fulfilled, (state, action) => {
            state.isCommentLoading = false;
            state.isCommentSuccess = true;
        })
        .addCase(addComment.rejected, (state, action) => {
            state.isCommentLoading = false;
            state.isCommentError = true;
            state.messageComment = action.payload;
        })
    }
})

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;