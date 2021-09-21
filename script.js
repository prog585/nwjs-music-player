var musicContainer;
var playBtn;
var prevBtn;
var nextBtn;

var audio;
var progress;
var progressContainer;
var title;
var cover;
var currTime;
var durTime;
var gui = require('nw.gui');
// Song titles
var songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
var songIndex = 2;
onload = function () {
  musicContainer = document.getElementById('music-container');
  playBtn = document.getElementById('play');
  prevBtn = document.getElementById('prev');
  nextBtn = document.getElementById('next');

  audio = document.getElementById('audio');
  progress = document.getElementById('progress');
  progressContainer = document.getElementById('progress-container');
  title = document.getElementById('title');
  cover = document.getElementById('cover');
  currTime = document.querySelector('#currTime');
  durTime = document.querySelector('#durTime');

  // Event listeners
  playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

  // Change song
  prevBtn.addEventListener('click', prevSong);
  nextBtn.addEventListener('click', nextSong);

  // Time/song update
  //audio.addEventListener('timeupdate', updateProgress);

  // Click on progress bar
  progressContainer.addEventListener('click', setProgress);

  // Song ends
  audio.addEventListener('ended', nextSong);

  // Time of song
  //audio.addEventListener('timeupdate', DurTime);

  loadSong(songs[songIndex]);
  //playSong();
  gui.Window.get().show();
};
// Initially load song details into DOM

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  //playSong();
  gui.Window.get().show();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  var { duration, currentTime } = e.srcElement;
  var progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  var width = this.clientWidth;
  var clickX = e.offsetX;
  var duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

//get duration & currentTime for Time of song
function DurTime(e) {
  var { duration, currentTime } = e.srcElement;
  var sec;
  var sec_d;

  // define minutes currentTime
  var min = currentTime == null ? 0 : Math.floor(currentTime / 60);
  min = min < 10 ? '0' + min : min;

  // define seconds currentTime
  function get_sec(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec = Math.floor(x) - 60 * i;
          sec = sec < 10 ? '0' + sec : sec;
        }
      }
    } else {
      sec = Math.floor(x);
      sec = sec < 10 ? '0' + sec : sec;
    }
  }

  get_sec(currentTime, sec);

  // change currentTime DOM
  if (currTime) currTime.innerHTML = min + ':' + sec;

  // define minutes duration
  let min_d = isNaN(duration) === true ? '0' : Math.floor(duration / 60);
  min_d = min_d < 10 ? '0' + min_d : min_d;

  function get_sec_d(x) {
    if (Math.floor(x) >= 60) {
      for (var i = 1; i <= 60; i++) {
        if (Math.floor(x) >= 60 * i && Math.floor(x) < 60 * (i + 1)) {
          sec_d = Math.floor(x) - 60 * i;
          sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
      }
    } else {
      sec_d = isNaN(duration) === true ? '0' : Math.floor(x);
      sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
    }
  }

  // define seconds duration

  get_sec_d(duration);

  // change duration DOM
  durTime.innerHTML = min_d + ':' + sec_d;
}
