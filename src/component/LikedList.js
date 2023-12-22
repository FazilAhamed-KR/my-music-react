import React from "react";
import { useSelector } from "react-redux";
import { selectLikedTracks } from "./LikesSlice";

const LikedList = () => {
  const LikedList = useSelector(selectLikedTracks);
  return (
    <div>
      <h2>LikedList</h2>
      <ul>
        {LikedList.map((track) => (
          <>
            <li key={track.id}>{track.name}</li>
            <img src={track.img} alt="NOIMAGE" />
          </>
        ))}
      </ul>
    </div>
  );
};

export default LikedList;
