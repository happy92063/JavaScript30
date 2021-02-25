const player = document.querySelector('.player'); //最外層的div
const video = player.querySelector('.viewer'); //影片的div
const progress = player.querySelector('.progress'); //影片播放bar的外層div
const progressBar = player.querySelector('.progress__filled');//影片播放bar的div 
const toggle = player.querySelector('.toggle'); //播放按鈕的div
const skipButtons = player.querySelectorAll('[data-skip]'); //兩個`skip`的div
const ranges = player.querySelectorAll('.player__slider'); //聲音大小及撥放速度bar的div

function togglePlay(){
    // 當我們對video 及 控制鈕(toggle)按下時會撥放/暫停。影片是否在撥放中可以藉由方法video.paused判定，並可以驅動play()or video[play]()及pause()or video[pause]()方法操控影片。
    let method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updateButton(){
    // 當我們對影片播放play()或暫停pause()時會更改撥放鍵的樣式。更改樣式使用toggle.textContent更改內容。
    let icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
}

function handleRangeUpadte(){
    // 利用changeormouseover去控制，並利用選取this.name的方式給值this.value。
    // video[volumn]及video[playbackRate]可以分別設定聲音及撥放速度。
    video[this.name] = this.value;
}

function handleProgress (){
    // 我們先利用video.currentTime取當前值，並除以video.duration(全長)並乘上100並得知進度條的比例位置。
    // 接著控制CSS的呈現，設定progressBar.style.flexBasis = ${percent}%;
    // 控制的事件可以使用timeUpdate或是progress可以得到一樣的效果。
    let percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function skip(){
    // skip共有兩個區域-10及+25，我們利用選取data-xxx當作標籤內的屬性。此時可以用querySelectorAll([data-xxx])選取，並逐一(forEach)增添事件click，觸發skip方法。而取資料時可以用this.dataset.xxx的方式取到該值。
    // 由於取到的值是string，我們要用parseFloat()強制轉換成number。
    // video.currentTime可以知道目前影片播放的時間。
    video.currentTime += parseFloat(this.dataset.skip);
}

function scrub(e){
    // 利用傳遞事件值進來，利用e.offsetX取得在當下該div的x值，除以div的全長 progress.offsetWidth可以得到百分比，乘以video.duration可以知道目前的撥放時間。並放到video.currentTime。
    let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click', togglePlay);
ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpadte);
    range.addEventListener('mousemove', handleRangeUpadte);
});
skipButtons.forEach(button => button.addEventListener('click', skip));
 // 設定mousedown = false當作flag。當按下(mousedown)為true，放開時(mouseup)為false，在移動時(mouseover)判定若mousedown參數為true時執行事件(scrub)。
let mousedown = false;
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e))
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)