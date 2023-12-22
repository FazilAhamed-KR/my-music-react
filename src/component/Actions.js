// actions.js

export const likeTrack = (trackId) => ({
  type: "LIKE_TRACK",
  payload: { trackId },
});

export const unlikeTrack = (trackId) => ({
  type: "UNLIKE_TRACK",
  payload: { trackId },
});
