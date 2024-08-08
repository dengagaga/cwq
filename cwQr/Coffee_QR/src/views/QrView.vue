<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const tem = ref('0:00')
// const img = ref(false)
const png = ref('')

onMounted(() => {
  if (localStorage.getItem('token')) {
    timer.start()
    const token = localStorage.getItem('token')
    console.log(token)
    axios
      .post(
        'http://cwbar.local/QRCode/get',
        { token: token },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      .then(function (response) {
        png.value = 'data:image/png;base64,' + response.data.data.qrCode
      })
      .catch(function (error) {
        console.log(error)
      })
  }
})
const start = () => {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token')
    console.log(token)
    axios
      .post(
        'http://cwbar.local/QRCode/get',
        { token: token },
        { headers: { Authorization: 'Bearer ' + token } }
      )
      .then(function (response) {
        png.value = 'data:image/png;base64,' + response.data.data.qrCode
      })
      .catch(function (error) {
        console.log(error)
      })
    timer.start()
  }
}
class CountDownTimer {
  constructor(duration, display) {
    this.duration = duration
    this.display = display
    this.timer = null
    this.tickFtns = []
  }

  start() {
    if (this.timer) {
      return
    }
    // img.value = true
    this.timer = setInterval(() => {
      this.duration -= 1
      this.tickFtns.forEach((ftn) => ftn(this.duration))
      this.render()
      if (this.duration <= 0) this.reset()
    }, 1000)
  }

  reset() {
    clearInterval(this.timer)
    this.timer = null
    this.duration = 5 * 60
    this.render()
  }

  render() {
    const minutes = parseInt(this.duration / 60, 10)
    const seconds = parseInt(this.duration % 60, 10)
    tem.value = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  onTick(ftn) {
    if (typeof ftn === 'function') {
      this.tickFtns.push(ftn)
    }
  }
}

const display = document.querySelector('#time')
const timer = new CountDownTimer(300, display)
// timer.onTick((currentTime) => {

// })
</script>
<template>
  <div class="container_mobil">
    <div class="qr_container">
      <img class="img_mb" :src="png" alt="" />
      <!-- <p v-else class="null">Нажмите на кнопку ниже, чтобы начать смену</p> -->
      <div id="time" class="timer">{{ tem }}</div>
      <div class="btns">
        <router-link class="form_btn btn_back" to="/main"
          ><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <title>ionicons-v5-a</title>
              <polyline
                points="244 400 100 256 244 112"
                style="
                  fill: none;
                  stroke: #000000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 48px;
                "
              ></polyline>
              <line
                x1="120"
                y1="256"
                x2="412"
                y2="256"
                style="
                  fill: none;
                  stroke: #000000;
                  stroke-linecap: round;
                  stroke-linejoin: round;
                  stroke-width: 48px;
                "
              ></line>
            </g>
          </svg>
        </router-link>
        <button @click="start()" class="form_btn qr_btn">Сгенерировать QR-код</button>
      </div>
    </div>
  </div>
</template>
<style>
.qr_container {
  background: var(--bgc-color) no-repeat 0 0;
  padding: 20px 20px;
  border-radius: 18px 18px 0 0;
  position: fixed;
  bottom: 0;
  height: 85vh;
  max-width: 600px;
  width: 100%;
  align-items: center;
  display: flex;

  flex-direction: column;
  gap: 35px;
}
.timer {
  margin-top: -40px;
  font-size: 28px;
  font-weight: 600;
  color: white;
  text-align: center;
}
.img_mb {
  max-width: 280px;
  margin-bottom: 30px;
}
.qr_btn {
  max-width: 200px;
  font-weight: 600;
  /* margin: 0 auto; */
  height: 38px;

  display: flex;
  align-items: center;
  gap: 15px;
  justify-content: center;
}
.btn_back svg {
  width: 20px;
}
.null {
  text-align: center;
  margin-bottom: 30px;
  font-size: 30px;
  color: white;
}
.btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.btn_back {
  max-width: 40px;

  /* margin: 0 auto; */
}
</style>
