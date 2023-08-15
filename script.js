console.log("Welcome to Spotify")

// Initialize the Variables
let songIndex = 0
let audioElement = new Audio('songs/1.mp3')
let masterPlay = document.getElementById('masterPlay')
let myProgressbar = document.getElementById('myProgressBar')
let songName = Array.from(document.getElementsByClassName('songItem'));
let songInfo = document.getElementById('songInfo')
let songs = [
    { songName: "Dancing With Your Ghost", filePath: "songs/1.mp3", coverPath: "cover/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "cover/2.jpg" },
    { songName: "DEAF KEV - Invincible ", filePath: "songs/3.mp3", coverPath: "cover/3.jpg" },
    { songName: "Different Heaven & EH!DE ", filePath: "songs/4.mp3", coverPath: "cover/4.jpg" },
    { songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "cover/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "cover/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "cover/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "cover/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "cover/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "cover/10.jpg" },
]

songName.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;

})

// Handle play/pause click
// audioElement.play()
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        markAllPlays()
        document.getElementById(songIndex).classList.remove('fa-play')
        document.getElementById(songIndex).classList.add('fa-pause')
        songInfo.innerText = songs[songIndex].songName
        masterPlay.classList.remove('fa-play')
        masterPlay.classList.add('fa-pause')
    } else {
        audioElement.pause();
        markAllPlays()
        document.getElementById(songIndex).classList.remove('fa-pause')
        document.getElementById(songIndex).classList.add('fa-play')
        masterPlay.classList.remove('fa-pause')
        masterPlay.classList.add('fa-play')
    }
})

audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate')
    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    myProgressbar.value = progress
})

myProgressbar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

const markAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause')
        element.classList.add('fa-play')
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        
            markAllPlays()
            e.target.classList.remove('fa-play')
            e.target.classList.add('fa-pause')
            songIndex = parseInt(e.target.id);
            audioElement.src = `songs/${songIndex + 1}.mp3`
            audioElement.play();
            songInfo.innerText = songs[songIndex].songName
            audioElement.currentTime = 0
            masterPlay.classList.remove('fa-play')
            masterPlay.classList.add('fa-pause')
        

    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    } else {
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    markAllPlays()
    document.getElementById(songIndex).classList.remove('fa-play')
    document.getElementById(songIndex).classList.add('fa-pause')
    audioElement.play();
    songInfo.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})
document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 9
    } else {
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`
    markAllPlays()
    document.getElementById(songIndex).classList.remove('fa-play')
    document.getElementById(songIndex).classList.add('fa-pause')
    audioElement.play();
    songInfo.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    masterPlay.classList.remove('fa-play')
    masterPlay.classList.add('fa-pause')
})