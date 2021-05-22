window.addEventListener("DOMContentLoaded", (event) => {
  const musicContainer = document.getElementById("music-container");
  const prev = document.getElementById("prev");
  const play = document.getElementById("play");
  const next = document.getElementById("next");
  const audio = document.getElementById("audio");
  const progress = document.getElementById("progress");
  const progressContainer = document.getElementById("progress-container");
  const title = document.getElementById("title");
  const cover = document.getElementById("cover");

  // Song title
  const songs = ["hey", "summer", "ukulele"];

  // Keep track of songs
  let songIndex = 2;

  // initially load song info into DOM
  loadSong(songs[songIndex]);

  function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
    progress.style.width = "0%";
  }

  function playSong() {
    musicContainer.classList.add("play");
    play.querySelector("i.fas").classList.remove("fa-play");
    play.querySelector("i.fas").classList.add("fa-pause");

    audio.play();
  }

  function pauseSong() {
    musicContainer.classList.remove("play");
    play.querySelector("i.fas").classList.remove("fa-pause");
    play.querySelector("i.fas").classList.add("fa-play");

    audio.pause();
  }

  function prevSong() {
    songIndex--;
    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
  }

  function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
  }

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    if (currentTime && duration) {
      const progresttPercent = (currentTime / duration) * 100;

      progress.style.width = `${progresttPercent}%`;
    }
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }

  /// Event Listners
  play.addEventListener("click", () => {
    if (musicContainer.classList.contains("play")) {
      pauseSong();
    } else {
      playSong();
    }
  });

  prev.addEventListener("click", prevSong);
  next.addEventListener("click", nextSong);

  audio.addEventListener("timeupdate", updateProgress);
  audio.addEventListener("ended", nextSong);

  progressContainer.addEventListener("click", setProgress);
});
