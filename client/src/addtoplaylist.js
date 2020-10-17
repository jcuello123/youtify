import axios from "axios";
import { accessToken } from "./accesstoken";

export default async function addToPlaylist(playlist) {
  let track_uris = await getTrackUris(playlist);

  //wait for getTrackUris to respond
  setTimeout(async () => {
    await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
      {
        uris: track_uris,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  }, 500);
}

async function getTrackUris(playlist) {
  const youtube_playlist_link = document.getElementById(playlist.name).value;
  if (!youtube_playlist_link) {
    return;
  }

  let track_uris = [];

  const res = await axios.post("http://localhost:3001/songs", {
    youtube_playlist_link: youtube_playlist_link,
  });

  let youtube_playlist = res.data;

  //convert object to array
  youtube_playlist = Object.entries(youtube_playlist);

  youtube_playlist.forEach(async (song) => {
    const res = await axios.get(
      `https://api.spotify.com/v1/search?q=artist%3A${song[1].artist}+track%3A${song[1].song_name}&type=track&limit=1`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    const items = res.data.tracks.items;

    if (items.length > 0) {
      let track_uri = items[0].uri;
      track_uris.push(track_uri);
    }
  });

  return track_uris;
}
