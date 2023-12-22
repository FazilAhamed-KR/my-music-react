// LikeComponent.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleLike } from './LikesSlice';

const LikeComponent = ({ track }) => {
  const dispatch = useDispatch();
  const likedTracks = useSelector((state) => state.musicPlayer.likedTracks);

  const isLiked = likedTracks.some((likedTrack) => likedTrack.id === track.id);

  const handleLikeButtonClick = () => {
    dispatch(toggleLike(track));
  };

  return (
    <div>
      <p>{track.name}</p>
      <button onClick={handleLikeButtonClick}>{isLiked ? 'Unlike' : 'Like'}</button>
    </div>
  );
};

export default LikeComponent;
