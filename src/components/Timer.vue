<template>
  <div class="container scale-[0.45]">
    <div id="time">
      <div class="circle" style="--color: #ff2972">
        <div class="dots h_dot"></div>
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70" id="hh"></circle>
        </svg>
        <div id="hours">00</div>
      </div>
      <div class="circle" style="--color: #fee800">
        <div class="dots m_dot"></div>
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70" id="mm"></circle>
        </svg>
        <div id="minutes">00</div>
      </div>
      <div class="circle" style="--color: #04fc43">
        <div class="dots s_dot"></div>
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle cx="70" cy="70" r="70" id="ss"></circle>
        </svg>
        <div id="seconds">00</div>
      </div>
      <div class="ap">
        <div id="ampm"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, reactive } from "vue";
import { useTimeStore } from "../stores/timer";
import sound from "../assets/sound.mp3";
import alarm from "../assets/alarm.mp3";
const timer = useTimeStore();
// get current time
let h = 0;
let m = 0;
let s = 0;
let ap = h >= 12 ? "" : "";

const store = reactive({
  is_time: true,
  interval1: "",
});

function playSound() {
  // let audio = new Audio(sound);
  // audio.pause();
  // audio.play();
}

function playAlarm() {
  // let audio = new Audio(alarm);
  // audio.pause();
  // audio.play();
}

const interval = () => {
  store.interval1 = setInterval(() => {
    console.log();
    // get time indicator elements
    let hours = document.getElementById("hours");
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");
    let ampm = document.getElementById("ampm");

    // digits time indicator
    let hh = document.getElementById("hh");
    let mm = document.getElementById("mm");
    let ss = document.getElementById("ss");

    // dot time indicator
    let dotH = document.querySelector(".h_dot");
    let dotM = document.querySelector(".m_dot");
    let dotS = document.querySelector(".s_dot");
    h = Number(timer.Hours);
    m = Number(timer.Minutes);
    s = Number(timer.Seconds);
    // get current time
    if (h > -1) {
      if (m == 0 && h > 0) {
        h -= 1;
      } else if (m == 0) {
        return;
      }
      if (s == 0 && m > 0) {
        playSound();
        playAlarm();
        m -= 1;
      } else if (s == 0) {
        m = 59;
      }
      if (s == 0 && m > 0) {
        s = 59;
      } else if (m > 0) {
        s -= 1;
      }
    }
    ap = h >= 12 ? "" : "";

    // convert to 12 hour format
    if (h > 12) {
      h = h - 12;
    }

    // add 0 before single digit
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    console.log(hours, h);
    // set time and label
    hours.innerHTML = h + "<br /><span>Soat</span>";
    minutes.innerHTML = m + "<br /><span>Daqiqa</span>";
    seconds.innerHTML = s + "<br /><span>Soniya</span>";
    ampm.innerHTML = ap;

    // set time circular indicator
    hh.style.strokeDashoffset = 440 - (440 * h) / 12;
    mm.style.strokeDashoffset = 440 - (440 * m) / 60;
    ss.style.strokeDashoffset = 440 - (440 * s) / 60;

    // set dot time position indicator
    dotH.style.transform = `rotate(${h * 30}deg)`;
    dotM.style.transform = `rotate(${m * 6}deg)`;
    dotS.style.transform = `rotate(${s * 6}deg)`;
    timer.changeTime(h, m, s);
  }, 1000);
};

onMounted(() => {
  interval();
});

onUnmounted(() => {
  timer.changeTime("00", "00", "00");
  clearInterval(store.interval1);
});
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;400;500;600;700;800;900&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Poppins", sans-serif;
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#time {
  display: flex;
  gap: 40px;
  color: #fff;
}

#time .circle {
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

#time .circle svg {
  position: relative;
  width: 150px;
  height: 150px;
  transform: rotate(270deg);
}

#time .circle svg circle {
  width: 100%;
  height: 100%;
  fill: transparent;
  stroke: #191919;
  stroke-width: 4px;
  transform: translate(5px, 5px);
}

#time .circle svg circle:nth-child(2) {
  stroke: var(--color);
  stroke-dasharray: 440;
}

#time div {
  position: absolute;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
}

#time div span {
  position: absolute;
  transform: translate(-50%, 0px);
  font-size: 0.5rem;
  font-weight: 300;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
}

#time .ap {
  position: relative;
  font-size: 1rem;
  transform: translate(-20px);
}

.dots {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  z-index: 10;
}

.dots::before {
  content: "";
  position: absolute;
  top: -3px;
  width: 15px;
  height: 15px;
  background: var(--color);
  border-radius: 50%;
  box-shadow: 0 0 20px var(--color), 0 0 60px var(--color);
}
</style>
