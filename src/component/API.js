// APIController Component
const clientId = "8f23d900d5e64043a872706333e9e33c";
const clientSecret = "121fe79a03634ab3bc4a8404edd54b91";

export const getToken = async () => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
  return data.access_token;
};

export const getGenres = async (token) => {
  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.categories.items;
};

export const getPlaylistByGenre = async (token, genreId) => {
  const limit = 20;

  const result = await fetch(
    `https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
      method: "GET",
      headers: { Authorization: "Bearer " + token },
    }
  );

  const data = await result.json();
  return data.playlists.items;
};

export const getTracks = async (token, tracksEndPoint) => {
  const limit = 20;

  const result = await fetch(`${tracksEndPoint}?limit=${limit}`, {
    method: "GET",
    headers: { Authorization: "Bearer " + token },
  });

  const data = await result.json();
  return data.tracks.items;
};

export const getTrack = async (token, trackEndPoint) => {
  try {
    const result = await fetch(`${trackEndPoint}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    //var a = result;
    const data = await result.json();
    return data;
  } catch (error) {
    console.error("Error fetching track data:", error);
    throw error; // Propagate the error so that the calling code can handle it
  }
};
