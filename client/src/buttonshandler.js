import axios from "axios";
import { accessToken } from "./accesstoken";

let track_uris = [];

export async function displaySongs(playlist) {
  //remove displayed songs if any
  let class_name = playlist.name.replaceAll(" ", "_").replace(/[^\w\s]/gi, "");
  console.log(class_name);
  let songs = document.querySelector(`.${class_name}`);
  songs.innerHTML = "";

  let { songs_and_track_uris } = await getTrackUris(playlist);

  //wait for getTrackUris to respond
  setTimeout(async () => {
    //display all songs
    songs_and_track_uris.forEach((song_and_track_uri) => {
      let song = song_and_track_uri.song;
      let div = document.createElement("div");
      let p = document.createElement("p");
      let div_class =
        "t" + song[1].song_name.replaceAll(" ", "_").replace(/[^\w\s]/gi, "");
      div.classList = `${div_class} display_song`;
      div.addEventListener("click", () =>
        removeSong(div_class, song_and_track_uri)
      );
      p.textContent = `${song[1].artist} - ${song[1].song_name}`;
      div.appendChild(p);
      songs.appendChild(div);
    });
  }, 500);
}

async function getTrackUris(playlist) {
  const youtube_playlist_link = document.getElementById(playlist.name).value;
  if (!youtube_playlist_link) {
    return;
  }

  let songs_and_track_uris = [];

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
      songs_and_track_uris.push({ song, track_uri });
    }
  });

  return { songs_and_track_uris };
}

function removeSong(div_class, song_and_track_uri) {
  let index = track_uris.indexOf(song_and_track_uri.track_uri);
  track_uris.splice(index, 1);
  document.querySelector(`.${div_class}`).remove();
}

export async function addToPlaylist(playlist) {
  let class_name = playlist.name.replaceAll(" ", "_").replace(/[^\w\s]/gi, "");

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

  document.querySelector(`.${class_name}`).innerHTML = "";
}
