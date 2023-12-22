import React from "react";
import { useSelector } from "react-redux";
import { selectLikedTracks } from "./LikesSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const LikedList = () => {
  const LikedList = useSelector(selectLikedTracks);
  return (
    <div className="container my-3">
    <div className="row gap-3">
      <div className="col-md-30">
        <ol className="list-group">
          {LikedList.map((track, index) => (
            <li
              key={track.id}
              className={`list-group-item d-flex justify-content-between align-items-center bg-dark text-light mb-${index === LikedList.length - 1 ? 0 : 3}`}
            >
              {track.name}
              <img
                className="img-fluid"
                style={{ width: "30px", height: "30px" }}
                src={track.img}
                alt="NOIMAGE"
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  </div>
  );
};

export default LikedList;
