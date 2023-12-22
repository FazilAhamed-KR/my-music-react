// likesSlice.js

import { createSlice } from '@reduxjs/toolkit';

export const likesSlice = createSlice({
  name: 'musicPlayer',
  initialState: {
    likedTracks: [], // Ensure this property is present
  },
  reducers: {
    toggleLike: (state, action) => {
      const trackId = action.payload;

            // Check if the track with the same ID is already liked
            const isTrackLiked = state.likedTracks.some(
              (track) => track.id === trackId.id
            );
      
            if (isTrackLiked) {
              // If liked, remove the track from the liked tracks array
              state.likedTracks = state.likedTracks.filter(
                (track) => track.id !== trackId.id
              );
            } else {
              // If not liked, push the track to the liked tracks array
              state.likedTracks.push(trackId);
            }
      // Your logic for toggling likes
    },
  },
});

export const { toggleLike } = likesSlice.actions;

export const selectLikedTracks = (state) => state.musicPlayer.likedTracks;

export default likesSlice.reducer;
