// store.js

// import { createStore, combineReducers } from "redux";
// import likeReducer from "./LikesSlice";

// const rootReducer = combineReducers({
//   like: likeReducer
//   // other reducers...
// });

// const store = createStore(rootReducer);

// export default store;


// store.js

import { configureStore } from '@reduxjs/toolkit';
import likesReducer from './LikesSlice'; // Adjust the path

const store = configureStore({
  reducer: {
    musicPlayer: likesReducer,
    // other reducers...
  },
});

export default store;

