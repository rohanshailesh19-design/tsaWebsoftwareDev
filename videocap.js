const videoInput = document.getElementById('videoInput');
const captionInput = document.getElementById('captionInput');
const videoPlayer = document.getElementById('player');

videoInput.addEventListener('change', e=> {
    videoPlayer.src = URL.createObjectURL(e.target.files[0]);
});

captionInput.addEventListener('change', e => {
    const track = document.createElement('track');
    track.kind = 'captions';
    track.src = URL.createObjectURL(e.target.files[0]);
    track.default = true;
    track.srclang = 'en';
    track.label = 'English';
    videoPlayer.appendChild(track);
})