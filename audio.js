const tc = document.getElementById('timecode');
const square = document.getElementById('blinking');
const ms = document.getElementById('offset');
var audio = document.getElementById('media1');
var note;
var bpm = document.getElementById('bpm');
const bpm_set = [118, 118, 126, 126];
var timer;

tc.textContent = 0;

function audio_select() {
    var elements = document.getElementsByName("music");
    for (var a = "", i = elements.length; i--;) {
        if (elements[i].checked) {
            a = elements[i].value;
            bpm.value = bpm_set[i];//ここでbpmの値に選択されたaudioのpbmの値をいれる
        }
    }

    audio = document.getElementById(a);
    AdjustBPM(bpm);
}

audio.addEventListener('play', (event) => {//playされたときの動作の追加
    beat_light();　//20ミリ秒ごとにbeat_lightを実行する
});

function beat_light() {
    timer=setInterval(function(){
    tc.textContent = audio.currentTime;
    let ti = audio.currentTime;
    let sti = parseInt(ti / note);//何拍目であるのかを算出
    console.log(audio.currentTime);
    if (sti % 2 == 0) {//偶数である場合と奇数である場合で色を変える
        square.style.color = "red";
    } else {
        square.style.color = "black";
    }
},20);
}

function stopTimer(){
    clearInterval(timer);
    }

function audio_start() {
    audio.pause();
    audio.currentTime = 0;
    setInterval(audio_select(),20);
    audio.play();
}

function audio_play() {
    audio.pause();
    audio.currentTime = ms.value;//offset
    audio_select();
    audio.play();
}

function audio_pause() {
    audio_select();
    audio.pause();
    stopTimer();
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