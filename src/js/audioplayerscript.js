const shuffleBtn = document.querySelector('#shuffle');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const repeatBtn = document.querySelector('#repeat');
const progressContainer = document.querySelector('.progresscontainer');
const progress = document.querySelector('.progress');
const musicTitle = document.querySelector('#musicTitle');
const musicAuthor = document.querySelector('#musicAuthor');
const musicCover = document.querySelector('#musicCover');
const controlbox = document.querySelector('.controlbox');
const playdiv = document.querySelector('#playdiv');
const audio = document.querySelector('#audio');

// For adding the play icon on the button..
playdiv.querySelector('img.playimg').classList.add('playbutton')

// Song titles...should match with the name of the song in the folder...
const songs = ['cardinal', 'flock-of-crows']

// Keep track of the songs using an index..
let songIndex = 0

// Initially load song info DOM
loadSong(songs[songIndex])

// Update song details function..
function loadSong(song) {
    //musicTitle.innertext = hello;
    document.getElementById("musicTitle").innerText = song;
    audio.src = `../src/music/${song}.mp3`

    //the cover name should be the same as the music name..
    //cover.src = `images/${song}`.jpg
}

// Function for playing song
function playSong() {
    controlbox.classList.add('play')
    //document.getElementById("play").classList.remove('#playbutton');
    playdiv.querySelector('img.playimg').classList.remove('playbutton');
    playdiv.querySelector('img.playimg').classList.add('pausebutton');
    
    audio.play()
}

// Function for playing song
function pauseSong() {
    controlbox.classList.remove('play')
    //document.getElementById("play").classList.remove('#playbutton');
    playdiv.querySelector('img.playimg').classList.add('playbutton');
    playdiv.querySelector('img.playimg').classList.remove('pausebutton');
    
    audio.pause()
}
// Function for going to the previous song
function prevSong(){
    songIndex--

    //if songIndex is less than 0, then we go to the last song to create a loop
    if(songIndex < 0) {
        songIndex = 0
    }

    loadSong(songs[songIndex])
    playSong()
}


// Function for going to the next song
function nextSong() {
    songIndex++

    //if songIndex is less than 0, then we go to the last song to create a loop
    if(songIndex > songs.length - 1) {
        songIndex = 0
        pauseSong();
    }

    loadSong(songs[songIndex])
    playSong()
}

//function for updating the progress bar using the duration of song..
function updateProgress(e) {
    // we get the total duration of the song together with the current time from the srcElement...deconstruct
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`

}

// function for changing song current time onclick of the progress bar
function setProgress(e) {
    //getting the total width of the element which is clicked...
    const width = this.clientWidth;

    //getting the width of where we are clicking.. 
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function songEnded() {
    if (songIndex > songs.length - 1) {
        songIndex = 0;
        pauseSong();        
    }
    nextSong(); 
}

// Event listeners on the audio buttons..
playdiv.addEventListener('click', () => { 
    const isplaying = controlbox.classList.contains('play')

    if(isplaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//change song event listeners..
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

//for updating the progress bar..
audio.addEventListener('timeupdate', updateProgress)

// for clicking anywhere in the progress bar..
progressContainer.addEventListener('click', setProgress)

// for actions after song has ended..
audio.addEventListener('ended', songEnded)