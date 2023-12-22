import { configureStore } from '@reduxjs/toolkit';
import likesReducer from './LikesSlice'; // Adjust the path

const store = configureStore({
  reducer: {
    musicPlayer: likesReducer,
    // other reducers...
  },
});

export default store;

