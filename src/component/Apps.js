import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {
  getGenres,
  getPlaylistByGenre,
  getToken,
  getTrack,
  getTracks,
} from "./API";
import { useSelector } from "react-redux";
import { selectLikedTracks } from "./LikesSlice";
import LikedList from "./LikedList";
import LikeComponent from "./LikeComponent";

const Apps = () => {
  const [genres, setGenres] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [selectedTrack, setSelectedTrack] = useState();
  const LikedLists = useSelector(selectLikedTracks);

  useEffect(() => {
    const loadGenres = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);

      const genresData = await getGenres(fetchedToken);
      setGenres(genresData);
    };

    loadGenres();
  }, []);

  const createGenre = (text, value) => {
    setGenres((prevGenres) => [...prevGenres, { text, value }]);
  };

  const createPlaylist = (text, value) => {
    setPlaylists((prevPlaylists) => [...prevPlaylists, { text, value }]);
  };

  const createTrack = (track) => {
    setTracks((prevTracks) => [...prevTracks, track]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetTracks();
    const token = getStoredToken().token;
    const selectedPlaylist = document.querySelector("#select_playlist");
    const tracksEndPoint =
      selectedPlaylist.options[selectedPlaylist.selectedIndex].value;
    const tracksData = await getTracks(token, tracksEndPoint);

    // Ensure that tracksData is not empty
    if (tracksData.length > 0) {
      tracksData.forEach((el) => {
        const track = el.track;

        // Use optional chaining to handle potential undefined values
        createTrack({
          id: track?.href,
          name: track?.name,
          previewUrl: track?.preview_url,
          img: track?.album?.images[0]?.url,
          artist: track?.artists[0]?.name,
        });
      });
    }

    // Reset currentSongIndex to 0
    setCurrentSongIndex(0);
  };

  const createTrackDetail = (id, img, name, artist, previewUrl) => {
    setSelectedTrack({ id, img, name, artist, previewUrl });
  };

  const handleTrackClick = async (e) => {
    e.preventDefault();
    const token = getStoredToken().token;
    const trackEndpoint = e.target.id;
    const tracks = await getTrack(token, trackEndpoint);
    if (tracks) {
      createTrackDetail(
        tracks.href,
        tracks.album?.images?.[0]?.url || "",
        tracks.name || "",
        tracks.artists?.[0]?.name || "",
        tracks.preview_url || ""
      );
    } else {
      console.error("Tracks data is not available or empty.");
      // Handle the case where tracks data is not available or empty
    }
  };

  const resetTracks = () => {
    setTracks([]);
    // setSelectedTrack(null);
  };

  const storeToken = (value) => {
    setToken(value);
  };

  const getStoredToken = () => {
    return {
      token: token,
    };
  };

  const playNextSong = (e) => {
    e.preventDefault();
    let nextTrackIndex = currentSongIndex + 1;
    if (nextTrackIndex >= tracks.length) {
      nextTrackIndex = 0;
    }
    setCurrentSongIndex(nextTrackIndex);
    setSelectedTrack(tracks[nextTrackIndex]);
  };

  const playPreviousSong = (e) => {
    e.preventDefault();
    let prevTrackIndex = currentSongIndex - 1;
    if (prevTrackIndex < 0) {
      prevTrackIndex = tracks.length - 1;
    }
    setCurrentSongIndex(prevTrackIndex);
    setSelectedTrack(tracks[prevTrackIndex]);
  };

  const playAudio = () => {};

  // const loadGenres = async () => {
  //   const token = await getToken();
  //   storeToken(token);
  //   const genres = await getGenres(token);
  //   genres.forEach((element) => createGenre(element.name, element.id));
  // };

  const handleGenreChange = async (e) => {
    e.preventDefault();
    // resetPlaylists();
    const token = getStoredToken().token;
    const genreId = e.target.value;
    const playlistData = await getPlaylistByGenre(token, genreId);
    setPlaylists(playlistData);
    playlistData.forEach((p) => createPlaylist(p.name, p.tracks.href));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left panel */}
        <div className="col-md-3">
          <div className="lists mb-3">
            <select
              className="form-select mb-2 w-100"
              id="select_genre"
              onChange={handleGenreChange}
            >
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <select className="form-select mb-2 w-100" id="select_playlist">
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.href}>
                  {playlist.name}
                </option>
              ))}
            </select>
            <button
              className="btn btn-primary w-100"
              id="btn_submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {/* Liked lists menu */}
          <div className="likes-menu w-50px">
            <h2 style={{color:"white"}}>Liked Lists</h2>
            <LikedList LikedSongList={LikedLists} />
          </div>
        </div>

        {/* Right panel */}
        <div className="col-md-9 text-dark font-weight-bold">
          <div id="list" className="mb-4">
            {tracks.map((track) => (
              <p
                key={track.id}
                id={track.id}
                onClick={handleTrackClick}
                className="cursor-pointer"
              >
                {track.name}
              </p>
            ))}
          </div>

          {selectedTrack && (
            <div className="row align-items-start">
              <div className="col-md-4 text-center">
                <div className="album-art mt-1">
                  <img
                    src={selectedTrack.img}
                    alt="Album Art"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-md-8 mt-5 text-white font-weight-bold">
                <h5>Song Name: {selectedTrack.name}</h5>
                <p>Artist Name: {selectedTrack.artist}</p>
                <AudioPlayer
                  // autoPlay
                  src={selectedTrack.previewUrl}
                  onPlay={playAudio}
                  showSkipControls={true}
                  onClickNext={playNextSong}
                  onClickPrevious={playPreviousSong}
                  className="mb-4"
                />

                <div className="likes mb-3">
                  <LikeComponent track={selectedTrack} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Apps;
