import React, { useState, useEffect } from "react";
import {
  getGenres,
  getPlaylistByGenre,
  getToken,
  getTrack,
  getTracks,
} from "./API";

const Apps = () => {
  const [genres, setGenres] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState("");
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    const loadGenres = async () => {
      const fetchedToken = await getToken();
      setToken(fetchedToken);

      const genresData = await getGenres(fetchedToken);
      setGenres(genresData);
    };

    loadGenres();
  }, []);

  const inputField = {
    genre: useState(""),
    playlist: document.querySelector("#select_playlist"),
    tracks: document.querySelector("#list"),
    submit: useState(null),
    songDetail: useState(null),
  };

  const createGenre = (text, value) => {
    setGenres((prevGenres) => [...prevGenres, { text, value }]);
  };

  const createPlaylist = (text, value) => {
    setPlaylists((prevPlaylists) => [...prevPlaylists, { text, value }]);
  };

  const createTrack = (id, name, previewUrl) => {
    setTracks((prevTracks) => [...prevTracks, { id, name, previewUrl }]);
  };

  const createTrackDetail = (img, title, artist, songUrl) => {
    return (
      <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="music-player">
            <div className="album-art text-center">
              <div className="row col-sm-12 px-0">
                <img src={img} alt={title} />
              </div>
              <div className="song-info text-center">
                <h5>{title}</h5>
                <p>Artist Name: {artist}</p>
              </div>
              <div className="iconsContainer">
                <div className="icons">
                  <button
                    id="prevButton"
                    className="icon"
                    onClick={playPreviousSong}
                  >
                    <i className="bi bi-skip-backward-fill"></i>
                  </button>
                  <audio id="myAudio" controls>
                    <source src={songUrl} type="audio/mpeg" />
                  </audio>
                  <button id="playButton" className="icon" onClick={playAudio}>
                    <i className="bi bi-play"></i>
                  </button>
                  <button
                    id="nextButton"
                    className="icon"
                    onClick={playNextSong}
                  >
                    <i className="bi bi-skip-forward-fill"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
    
  };

  const resetTrackDetail = () => {
    setTracks([]);
  };

  const resetTracks = () => {
    setTracks([]);
    resetTrackDetail();
  };

  const resetPlaylists = () => {
    setPlaylists([]);
    resetTracks();
  };

  const storeToken = (value) => {
    setToken(value);
  };

  const getStoredToken = () => {
    return {
      token: token,
    };
  };

  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex((prevIndex) => prevIndex - 1);
    } else {
      // setCurrentSongIndex(songUrls.length - 1);
    }
  };

  const playNextSong = () => {
    // if (currentSongIndex < songUrls.length - 1) {
    //   setCurrentSongIndex((prevIndex) => prevIndex + 1);
    // } else {
    //   setCurrentSongIndex(0);
    // }
  };

  const playAudio = () => {
    const audio = document.getElementById("myAudio");
    const playButton = document.getElementById("playButton");

    if (audio.paused) {
      audio.play();
      playButton.innerHTML = '<i class="bi bi-pause"></i>';
    } else {
      audio.pause();
      playButton.innerHTML = '<i class="bi bi-play"></i>';
    }
  };

  const loadGenres = async () => {
    const token = await getToken();
    storeToken(token);
    const genres = await getGenres(token);
    genres.forEach((element) => createGenre(element.name, element.id));
  };

  // const handleGenreChange = async () => {
  //   // resetPlaylists();
  //   const token = getStoredToken().token;
  //   const genreSelect = inputField.genre;
  //   console.log(genreSelect);
  //   console.log(genreSelect.options[genreSelect.selectedIndex]);
  //   const genreId = genreSelect.options[genreSelect.selectedIndex].value;
  //   const playlistData = await getPlaylistByGenre(token, genreId);
  //   setPlaylists(playlistData)
  //   playlistData.forEach((p) => createPlaylist(p.name, p.tracks.href))
  // };

  const handleGenreChange = async (e) => {
    // resetPlaylists();
    const token = getStoredToken().token;
    const genreId = e.target.value;
    console.log(genreId);
    const playlistData = await getPlaylistByGenre(token, genreId);
    setPlaylists(playlistData);
    playlistData.forEach((p) => createPlaylist(p.name, p.tracks.href));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetTracks();
    const token = getStoredToken().token;
    const selectedPlaylist = inputField.playlist;
    const tracksEndPoint =
      selectedPlaylist.options[selectedPlaylist.selectedIndex].value;
    const tracksData = await getTracks(token, tracksEndPoint);
    tracksData.forEach((el) =>
      createTrack(el.track.href, el.track.name, el.track.preview_url)
    );
  };

  const handleTrackClick = async (e) => {
    e.preventDefault();
    // resetTrackDetail();
    // var a = test;
    const token = getStoredToken().token;
    // const selectedTracklist = inputField.tracks;
    const trackEndpoint = e.target.id;
    const track = await getTrack(token, trackEndpoint);
    // console.log(track);
   var a = createTrackDetail(
      track.album.images[2].url,
      track.name,
      track.artists[0].name,
      track.preview_url
    );
    document.querySelector("#song_details").innerHTML = a;
    
  };
  return (
    <div>
      <select id="select_genre" onChange={handleGenreChange}>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      <select id="select_playlist">
        {playlists.map((playlist) => (
          <option key={playlist.id} value={playlist.href}>
            {playlist.name}
          </option>
        ))}
      </select>

      <div id="list">
        {tracks.map((tracks) => (
          <p key={tracks.id} id={tracks.id} value={tracks.name} onClick={(handleTrackClick)}>
            {tracks.name}
          </p>
        ))}
      </div>
      <button id="btn_submit" onClick={handleSubmit}>
        Submit
      </button>
      <div id="song_details"></div>
    </div>
  );
};

export default Apps;
