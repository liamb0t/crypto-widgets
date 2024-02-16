<script setup>

const props = defineProps({
  widgetSettings: {
    type: Object,
    required: true,
    default: {
      'coin': '90',
      'alertPrice': 40000,
    }
  }
})

const audioAlert = ref(null)
const coins = ref(null)

function classObject(filter) {
  return {
    'text-rose-500': filter < 0,
    'text-green-700': filter >= 0,
  }
}

async function getCoinData() {
  const response = await fetch(`https://api.coinlore.net/api/tickers/?start=0&limit=10`)
  const data = await response.json();
  coins.value = data.data
}

async function addCoinToList() {
  const response = await fetch(`https://api.coinlore.net/api/ticker/?id=${props.widgetSettings.coin}`)
  const data = await response.json();
  coins.value.push(data[0])
}

onMounted(() => {
  getCoinData()
})


watch(() => props.widgetSettings.coin, (newPrice, oldPrice) => {
  const exists = coinData.value.some(crypto => crypto.id === props.widgetSettings.coin);
  if (!exists) {
    addCoinToList()
  }
});


const playAudio = () => {
  if (audioAlert.value) {
    audioAlert.value.play();
  }
};

</script>

<template>  
  <div class="marquee">
    <div class="marquee-inner">
      <div class="flex items-center mr-10" v-for="coin in coins" :key="coin.id">
        <img class="mr-1 w-4" :src="`https://www.coinlore.com/img/50x50/${coin.nameid}.png`" alt="">
        <span class="font-semibold mr-1 dark:text-white">{{ coin.name }}</span>
        <span class="font-light text-xs mr-1 dark:text-white">{{ coin.symbol }}</span>
        <span>{{ coin.price_usd }} USD</span>
        <span :class="classObject(coin.percent_change_24h)">({{ coin.percent_change_24h }}%)</span>
      </div>
    </div>
  </div>
</template>
 <style scoped>
.marquee {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  border: 1px solid black;
}

.marquee-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  animation: marquee 30s linear infinite;
}

span {
  margin-top: 0;
}

@keyframes marquee {
  0% {
    transform: translateX(100vw);
  }
  100% {
    transform: translateX(-300%);
  }
}
</style>
