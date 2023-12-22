import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "./LikesSlice";
import "bootstrap-icons/font/bootstrap-icons.css";

const LikeComponent = ({ track }) => {
  const dispatch = useDispatch();
  const likedTracks = useSelector((state) => state.musicPlayer.likedTracks);

  const isLiked = likedTracks.some((likedTrack) => likedTrack.id === track.id);

  const handleLikeButtonClick = () => {
    dispatch(toggleLike(track));
  };

  return (
    <div>
      <button
        onClick={handleLikeButtonClick}
        type="button"
        className={`btn ${isLiked ? "btn-danger" : "btn-outline-danger"}`}
      >
        {isLiked ? (
          <i className="bi bi-balloon-heart-fill"></i>
        ) : (
          <i className="bi bi-balloon-heart"></i>
        )}
      </button>
    </div>
  );
};

export default LikeComponent;
