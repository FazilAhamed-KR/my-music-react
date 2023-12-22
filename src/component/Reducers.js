// // reducer.js

// const initialState = {
//   likedTracks: [],
// };

// const musicPlayerReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "LIKE_TRACK":
//       return {
//         ...state,
//         likedTracks: [...state.likedTracks, action.payload.trackId],
//       };

//     case "UNLIKE_TRACK":
//       return {
//         ...state,
//         likedTracks: state.likedTracks.filter(
//           (id) => id !== action.payload.trackId
//         ),
//       };

//     default:
//       return state;
//   }
// };

// export default musicPlayerReducer;
