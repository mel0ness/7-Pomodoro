const workMinutes = document.getElementById("workMinutes")
const workSeconds = document.getElementById("workSeconds")
const breakMinutes = document.getElementById("breakMinutes")
const breakSeconds = document.getElementById("breakSeconds")
const playButton = document.getElementById("play")
const playButtonIMG = document.getElementById("playIMG")
const resetButton = document.getElementById("reset")
const cycles = document.getElementById("cycles")
const timerWork = document.getElementById("timerWork")
const timerBreak = document.getElementById("timerBreak")
const timerActive = document.getElementsByClassName("P7-active")
let running = false;
let runningClass = true;
let timers = [30, 0, 5, 0]
let moment = "work";
let cyclesCount = 0;


playButton.addEventListener("click", () => {
    if(running) {
        changeSVG("play");
        running = false;
    }
    else {
        runningClass = true;
        changeSVG("pause")
        running = true;
        if(moment === "work") {
        let playWork = setInterval(function()
        {play(workMinutes, workSeconds, 0, 1, playWork, timerWork)}, 1000)}
        else {
            let playBreak = setInterval(function()
        {play(breakMinutes, breakSeconds, 2, 3, playBreak, timerBreak)}, 1000)
        }
    }}
)

resetButton.addEventListener("click", () => {
    changeSVG("play")
    running = false;
    runningClass = false;
    timers = [30, 0, 5, 0]
    workMinutes.innerText = "30"
    workSeconds.innerText = "00"
    breakMinutes.innerText = "5"
    breakSeconds.innerText = "00"
    cyclesCount=0
    cycles.innerText = "0"
    timerBreak.classList.remove("P7-active")
    timerWork.classList.remove("P7-active")
})

const changeSVG = (e) => {
    playButtonIMG.src= `./ressources/${e}.svg`
}

const music = () => {
    const audio = new Audio();
    audio.src = "./ressources/Enter.mp3";
    audio.play();
};

const standBy = (e,f) => {
if(running) {
    clearInterval(e)
}
else if(runningClass) {
    if(f === "work") {
timerWork.classList.add("P7-active")
setTimeout(function() {
timerWork.classList.remove("P7-active")
}, 500)
    }
else {
    timerBreak.classList.add("P7-active")
setTimeout(function() {
timerBreak.classList.remove("P7-active")
}, 500)
}
}
else {
    timerBreak.classList.remove("P7-active")
    timerWork.classList.remove("P7-active")
}
}

const play = (f, g, h, i, j, k) => {
    k.classList.add("P7-active")
    if(!running) {
        clearInterval(j)
        k.classList.remove("P7-active")
        let standby = setInterval(function()
        {standBy(standby, moment)}, 1000)
    }

   else if(timers[h] > 0 && timers[i] ===0) {
        timers[h]--;
        timers[i] = 59;
        f.innerText = timers[h];
g.innerText = timers[i];
    }
    else if(timers[h] >= 0 && timers[i] > 0) {
        timers[i]--;
        f.innerText = timers[h];
        if(timers[i]> 9) {
            g.innerText = timers[i];
        }
        else{
g.innerText = `0${timers[i]}`;}
    }
    else {
        f.innerText = timers[h]
        g.innerText = timers[i]
        if(moment === "work"){
            music()
            timers[h] = 30
            timers[i] = 0
            f.innerText = timers[h]
            g.innerText = "00"
            moment = "break"
            clearInterval(j)
            k.classList.remove("P7-active")
        let playBreak = setInterval(function()
        {play(breakMinutes, breakSeconds, 2, 3, playBreak, timerBreak)}, 1000)
        }
        else {
            music()
            timers[h] = 5
            timers[i] = 0
            f.innerText = timers[h]
            g.innerText = "00"
            moment = "work"
            cyclesCount++;
            cycles.innerText = cyclesCount;
            clearInterval(j)
            k.classList.remove("P7-active")
            let playWork = setInterval(function()
            {play(workMinutes, workSeconds, 0, 1, playWork, timerWork)}, 1000)
        }
       
    }
}