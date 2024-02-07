<script setup>

const props = defineProps({
  widgetSettings: {
    type: Object,
    required: false,
    default: () => ({
      'coin': '90',
      'alertPrice': 40000,
    })
  },
  isPreview: {
    type: Boolean,
    required: false,
    default: false,
  },
  darkMode: {
    type: Boolean,
    required: true,
    default: false,
  }
})

const coinData = ref(null)

async function getCoinData() {
  console.log(props.widgetSettings)
  const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${props.widgetSettings.coin}`)
  const data = await response.json();
  coinData.value = data[0]
}

onMounted(() => {
  getCoinData()
})

watch(() => props.widgetSettings.coin, (newPrice, oldPrice) => {
  getCoinData()
});

if (!props.isPreview) {
  const interval =  1 * 60 * 1000
  setInterval(getCoinData, interval)
}

const audioAlert = ref(null)

function classObject(filter) {
  return {
    'text-rose-700': filter < 0,
    'text-green-700': filter >= 0,
  }
}

const playAudio = () => {
  if (audioAlert.value) {
    audioAlert.value.play();
  }
};

</script>

<template>
  <div :class="{ 'dark': darkMode}"> 
    <div class="flex flex-col border border-black-500 dark:bg-neutral-900" v-if="coinData">
      <div class="border-b border-black-500 p-5">
        <div class="flex items-center">
        <img class="mr-5" :src="`https://www.coinlore.com/img/50x50/${coinData.nameid}.png`" alt="">
          <div class="flex flex-col">
              <div class="flex items-center">
                <div class="font-semibold mr-1 dark:text-white">{{ coinData.name }}</div>
                <div class="font-light text-xs dark:text-white">{{ coinData.symbol }}</div>
              </div>
              <div class="flex">
                <div class="mr-1 font-light dark:text-white">
                  {{ coinData.price_usd }} USD
                </div>
                <div :class="classObject(coinData.percent_change_24h)">
                  ({{ coinData.percent_change_24h > 0 ? `+${ coinData.percent_change_24h }` :  coinData.percent_change_24h }}%)
                </div>
              </div> 
              <div class="mr-1 font-light text-xs dark:text-white">
                  {{ coinData.price_btc }} BTC
                </div>
          </div>
        </div>
      </div>
      <div class="flex justify-evenly">
        <div v-if="widgetSettings.market_cap_usd" class="w-full flex flex-col items-center justify-center border-r border-black-500 p-5 last:border-0">
          <p class="font-semibold text-xs mb-2 dark:text-white">
            Market Cap
          </p>
          <p class="font-light dark:text-white">
            {{ (coinData.market_cap_usd/1000000000).toFixed(2) }} B USD
          </p>
        </div>
        <div v-if="widgetSettings.volume24" class="w-full flex flex-col items-center justify-center border-r border-black-500 p-5 dark:text-white last:border-0">
          <p class="font-semibold text-xs mb-2">
            Vol (24H)
          </p>
          <p class="font-light dark:text-white">
            {{ (coinData.volume24/1000000000).toFixed(2) }} B USD
          </p>
        </div>
        <div v-if="widgetSettings.percent_change_7d" class="w-full flex flex-col items-center justify-center p-5 dark:text-white last:border-0" >
          <p class="font-semibold text-xs mb-2">
            7D Change
          </p>
          <div :class="classObject(coinData.percent_change_7d)">
            {{ coinData.percent_change_7d > 0 ? `+${ coinData.percent_change_7d }` :  coinData.percent_change_7d }}%
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <span class="loader"></span>
    </div>
    <audio ref="audioAlert">
        <source src="assets/you_suffer.mp3" type="audio/mp3">
    </audio>
  </div>
</template>
<style scoped>
.loader {
  width: 320px;
  height: 150px;
  display: block;
  margin: auto;
  position: relative;
  background: #FFF;
  box-sizing: border-box;
}
.loader::after {
  content: '';  
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  top: 15px;
  left: 15px;
  position: absolute;
  background-image: linear-gradient(100deg, transparent, rgba(255, 255, 255, 0.5) 50%, transparent 80%), radial-gradient(circle 28px at 28px 28px, #DDD 99%, transparent 0), linear-gradient(#DDD 24px, transparent 0), linear-gradient(#DDD 18px, transparent 0), linear-gradient(#DDD 66px, transparent 0);
  background-repeat: no-repeat;
  background-size: 75px 130px, 55px 56px, 160px 30px, 260px 20px, 290px 56px;
  background-position: 0% 0, 0 0, 70px 5px, 70px 38px, 0px 66px;
  box-sizing: border-box;
  animation: animloader 1s linear infinite;
}

@keyframes animloader {
  0% {
    background-position: 0% 0, 0 0, 70px 5px, 70px 38px, 0px 66px;
  }
  100% {
    background-position: 150% 0, 0 0, 70px 5px, 70px 38px, 0px 66px;
  }
}
</style>
