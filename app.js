const workMinutes = document.getElementById("workMinutes")
const workSeconds = document.getElementById("workSeconds")
const breakMinutes = document.getElementById("breakMinutes")
const breakSeconds = document.getElementById("breakSeconds")
const playButton = document.getElementById("play")
const cycles = document.getElementById("cycles")
let running = false;
let timers = [30, 0, 5, 0]
let moment = "work";
let cyclesCount = 0;


playButton.addEventListener("click", () => {
    if(running) {
        changeSVG("play");
        running = false;
    }
    else {
        changeSVG("pause")
        running = true;
        if(moment === "work") {
        let playWork = setInterval(function()
        {play(workMinutes, workSeconds, 0, 1, playWork)}, 1000)}
        else {
            let playBreak = setInterval(function()
        {play(breakMinutes, breakSeconds, 2, 3, playBreak)}, 1000)
        }
    }}
)

const changeSVG = (e) => {
    playButton.src= `./ressources/${e}.svg`
}

const play = (f, g, h, i, j) => {
    if(!running) {
        clearInterval(j)
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
            timers[h] = 30
            timers[i] = 0
            f.innerText = timers[h]
            g.innerText = "00"
            moment = "break"
            clearInterval(j)
        let playBreak = setInterval(function()
        {play(breakMinutes, breakSeconds, 2, 3, playBreak)}, 1000)
        }
        else {
            timers[h] = 5
            timers[i] = 0
            f.innerText = timers[h]
            g.innerText = "00"
            moment = "work"
            clearInterval(j)
            let playWork = setInterval(function()
            {play(workMinutes, workSeconds, 0, 1, playWork)}, 1000)
        }
       
    }
}