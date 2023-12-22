// import React from "react";
// import { connect } from "react-redux";
// import { likeTrack, unlikeTrack } from "./Actions";
// import { LikedList } from "./LikedList";

// const LikeComponent = ({ track, likedTracks, likeTrack, unlikeTrack }) => {
//   // Check if track is defined
//   if (!track) {
//     return; // or render an appropriate fallback UI
//   }

//   const isLiked = likedTracks.includes(track); // Assuming track has an 'id' property

//   const handleLikeButtonClick = () => {
//     if (isLiked) {
//       unlikeTrack(track);
//     } else {
//       likeTrack(track);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLikeButtonClick}>
//         {isLiked ? "Unlike" : "Like"}
//       </button>
//       <LikedList LikedSongList={likedTracks} />
//     </div>
//   );
// };

// const mapStateToProps = (state) => ({
//   likedTracks: state.musicPlayer.likedTracks,
// });

// const mapDispatchToProps = {
//   likeTrack,
//   unlikeTrack,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(LikeComponent);
