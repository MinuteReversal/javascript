(function () {
  const a = document.createElement("a");
  const url = document.querySelector("audio").src;
  const name = url; /*document.querySelector(".name").innerText;*/
  a.text = name;
  a.type = "audio/mp3";
  a.target = "_blank";
  a.setAttribute("download", name);
  a.href = url;
  document.body.appendChild(a);
  a.fileName = name;
  a.click();
  document.body.removeChild(a);
})();

(function () {
  const audio = document.querySelector("audio");
  audio.addEventListener("load", (evt) => {
    console.log(audio.src);
  });
})();

(function () {
  const url = document.querySelector("audio").src;
  const xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  xhr.onload = function () {
    const a = document.createElement("a");
    const name = document.querySelector(".name").innerText + ".mp3";
    const url = URL.createObjectURL(xhr.response);
    a.type = "audio/mp3";
    a.target = "_blank";
    a.href = url;
    a.setAttribute("download", name);
    document.body.appendChild(a);
    a.fileName = name;
    anchor.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  xhr.open("GET", url);
  xhr.send();
})();

(function () {
  const songs = document.querySelectorAll(".song_item");
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    song.addEventListener("click", (evt) => {
      const name = song.querySelector(".name").title;
      window.songName = name;
      console.log(name);
    });
  }
})();



(function () {
  document.querySelector("audio").addEventListener("play", (evt) => {
    const name = document.querySelector(".song_name").innerText + ".htm";
    const a = document.createElement("a");
    const url = document.querySelector("audio").src;
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(xhr.response);
        a.text = name;
        a.type = "audio/mp3";
        a.target = "_blank";
        a.href = url;
        a.download = name;
        a.fileName = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  });
})();

(function () {
  const outList = document.createElement("div");
  outList.style.position = "fixed";
  outList.style.top = "0";
  outList.style.left = "0";
  outList.style.display = "flex";
  outList.style.flexDirection = "column";
  document.body.appendChild(outList);

  document.querySelector("audio").addEventListener("playing", (evt) => {
    const name = document.querySelector(".info .song_name").innerText + ".mp3";
    const a = document.createElement("a");
    const url = document.querySelector("audio").src;
    a.text = name;
    a.target = "_blank";
    a.href = url;
    a.setAttribute("download", name);
    a.addEventListener("click", (evt) => {
      evt.preventDefault();
      navigator.clipboard.writeText(name);
    });
    outList.appendChild(a);
  });
})();