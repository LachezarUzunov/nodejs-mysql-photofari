import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photosService from "./photosService";

const initialState = {
  photos: [],
  photo: {},
  isPhotoSuccess: false,
  isPhotoError: false,
  isPhotoLoading: false,
  photoMessage: "",
};

// Upload new Photo
export const uploadPhoto = createAsyncThunk(
  "photo/upload",
  async (photo, thunkAPI) => {
    console.log(photo);
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await photosService.publishPhoto(photo, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET Last Ten Photos
export const getLastTen = createAsyncThunk(
  "photos/getLastTen",
  async (_, thunkAPI) => {
    try {
      return await photosService.getLastTen();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSinglePhoto = createAsyncThunk(
  'photo/getPhoto',
  async(photoId, thunkAPI) => {
    try {
      return await photosService.getPhotoById(photoId)
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
    }
  }
)

// DELETE a photo
export const deletePhoto = createAsyncThunk('photo/deletePhoto', 
  async (photoId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await photosService.deletePhoto(photoId, token)
    } catch (error) {
      const message = 
        (error.response && error.response.data &&
          error.response.data.message) || error.message ||
          error.toString();

      return thunkAPI.rejectWithValue(message)
    }
  }) 

export const photosSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    reset: (state) => {
      state.isPhotoLoading = false;
      state.isPhotoError = false;
      state.isPhotoSuccess = false;
      state.photoMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadPhoto.pending, (state) => {
        state.isPhotoLoading = true;
      })
      .addCase(uploadPhoto.fulfilled, (state, action) => {
        state.isPhotoLoading = false;
        state.isPhotoSuccess = true;
        state.photo = action.payload;
      })
      .addCase(uploadPhoto.rejected, (state, action) => {
        state.isPhotoLoading = false;
        state.isPhotoError = true;
        state.photoMessage = action.payload;
      })
      .addCase(getLastTen.pending, (state) => {
        state.isPhotoLoading = true;
      })
      .addCase(getLastTen.fulfilled, (state, action) => {
        state.isPhotoLoading = false;
        state.isPhotoSuccess = true;
        state.photos = action.payload;
      })
      .addCase(getLastTen.rejected, (state, action) => {
        state.isPhotoLoading = false;
        state.isPhotoError = true;
        state.photoMessage = action.payload;
      })
      // GET single Photo/ by ID/ public
      .addCase(getSinglePhoto.pending, (state) => {
        state.isPhotoLoading = true;
      })
      .addCase(getSinglePhoto.fulfilled, (state, action) => {
        state.isPhotoLoading = false;
        state.isPhotoError = false;
        state.isPhotoSuccess = true;
        state.photo = action.payload;
      })
      .addCase(getSinglePhoto.rejected, (state, action) => {
        state.isPhotoLoading = false;
        state.isPhotoError = true;
        state.isPhotoSuccess = false;
        state.photoMessage = action.payload;
      })
      // Delete a photo
      .addCase(deletePhoto.pending, (state) => {
        state.isPhotoLoading = true;
      })
      .addCase(deletePhoto.fulfilled, (state, action) => {
        state.isPhotoLoading = false;
        state.isPhotoSuccess = true;
        state.photo = {};
      })
      .addCase(deletePhoto.rejected, (state, action) => {
        state.isPhotoLoading = false;
        state.isPhotoError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = photosSlice.actions;
export default photosSlice.reducer;
