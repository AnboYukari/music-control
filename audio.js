const tc = document.getElementById('timecode');
const square = document.getElementById('blinking');
const ms = document.getElementById('offset');
var audio = document.getElementById('media1');
var note;
var bpm = document.getElementById('bpm');
const bpm_set = [118, 118, 126, 126];

tc.textContent = 0;

console.log(note);

function audio_select() {
    var elements = document.getElementsByName("music");
    for (var a = "", i = elements.length; i--;) {
        if (elements[i].checked) {
            a = elements[i].value;
            bpm.value = bpm_set[i];//ここでbpmの値に選択されたaudioのpbmの値をいれる
            //console.log(a);
        }
    }
    AdjustBPM(bpm);
    audio = document.getElementById(a);
    console.log(note);

    audio.addEventListener('timeupdate', (event) => {
        tc.textContent = audio.currentTime;
        let ti = audio.currentTime;
        let sti = parseInt(ti / note);
        console.log(ti);
        //console.log(ti / note);
        //console.log(sti);
        if (sti % 2 == 0) {
            square.style.color = "red";
        } else {
            square.style.color = "black";
        }

    });
}

function audio_start() {
    audio.pause();
    audio.currentTime = 0;
    audio_select();
    audio.play();
}

function audio_play() {
    audio.pause();
    audio.currentTime = ms.value;
    audio_select();
    audio.play();
}

function audio_pause() {
    audio_select();
    audio.pause();
}

function audio_back() {
    let ti = parseInt(audio.currentTime);
    audio.currentTime = ti - 1.0;
}

function audio_go() {
    let ti = parseInt(audio.currentTime);
    audio.currentTime = ti + 1.0;
}

function AdjustBPM(x) {
    // 音の長さをBPMに合わせる
    note = 60 / x.value;
}