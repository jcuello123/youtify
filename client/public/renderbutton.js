const value = new URLSearchParams(window.location.search);
const accessToken = value.get("access_token");

if (!accessToken) {
  const body = document.querySelector("body");
  const div = document.createElement("div");
  const a = document.createElement("a");
  const p = document.createElement("p");

  p.setAttribute("id", "view_playlists_text");

  a.setAttribute("href", "/login");
  a.innerText = "Log in";
  a.setAttribute("id", "login_button");

  p.innerText = " to edit your playlists.";

  div.appendChild(a);
  div.appendChild(p);
  body.appendChild(div);
}
