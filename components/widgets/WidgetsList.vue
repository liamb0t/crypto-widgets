<script setup>

//props and variables

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

const coinData = ref(null)
const interval =  1 * 60 * 1000
const audioAlert = ref(null)
const isDescending = ref(false)

//functions

async function getCoinData() {
  const response = await fetch(`https://api.coinlore.net/api/tickers/?start=0&limit=10`)
  const data = await response.json();
  coinData.value = data.data
}

function classObject(filter) {
  return {
    'text-rose-500': filter < 0,
    'text-green-400': filter >= 0,
  }
}

const playAudio = () => {
  if (audioAlert.value) {
    audioAlert.value.play();
  }
};

function filter(filterBy) {
  if (isDescending.value) {
    coinData.value.sort((a, b) => parseFloat(a[filterBy]) - parseFloat(b[filterBy]));
  } else {
    coinData.value.sort((a, b) => parseFloat(b[filterBy]) - parseFloat(a[filterBy]));
  }
    isDescending.value = !isDescending.value
}

setInterval(getCoinData, interval)

//lifecycle hooks and watchers

onMounted(() => {
  getCoinData()
})

watch(() => props.widgetSettings.coin, (newPrice, oldPrice) => {
  getCoinData()
});

</script>

<template> 
  <table>
    <thead>
      <th>Coin</th>
      <th>
        <div class="flex items-center">
          <div class="mr-0.1">
            Price
          </div>
          <div>
            <img src="~assets/img/filter-icon.svg" @click="filter('price_usd')">
          </div>
        </div>
      </th>
      <th>
        <div class="flex items-center">
          <div class="mr-0.1">
            Price
          </div>
          <div>
            <img src="~assets/img/filter-icon.svg" @click="filter('price_usd')">
          </div>
        </div>
      </th>
      <th>
        <div class="flex items-center">
          <div class="mr-0.1">
            Price
          </div>
          <div>
            <img src="~assets/img/filter-icon.svg" @click="filter('price_usd')">
          </div>
        </div>
      </th>
      <th>
        <div class="flex items-center">
          <div class="mr-0.1">
            Price
          </div>
          <div>
            <img src="~assets/img/filter-icon.svg" @click="filter('price_usd')">
          </div>
        </div>
      </th>
      <th>
        <div class="flex items-center">
          <div class="mr-0.1">
            Price
          </div>
          <div>
            <img src="~assets/img/filter-icon.svg" @click="filter('price_usd')">
          </div>
        </div>
      </th>
      <th>
        <div class="flex items-center">
          <div class="mr-0.1">
            Price
          </div>
          <div>
            <img src="~assets/img/filter-icon.svg" @click="filter('price_usd')">
          </div>
        </div>
      </th>
    </thead>
    <tr v-for="coin in coinData" :key="coin.id">
      <div class="flex items-center">
        <img class="h-10 mr-4" :src="`https://www.coinlore.com/img/50x50/${coin.nameid}.png`" alt="">
          <div class="flex flex-col">
              <td class="font-semibold">{{ coin.name }}</td>
              <td class="text-xs font-light">{{ coin.symbol }}</td> 
          </div>
      </div>
      <td>${{ coin.price_usd }}</td>
      <td :class="classObject(coin.percent_change_1h)">{{ coin.percent_change_1h }}%</td>
      <td :class="classObject(coin.percent_change_24h)">{{ coin.percent_change_24h }}%</td>
      <td :class="classObject(coin.percent_change_7d)">{{ coin.percent_change_7d }}%</td>
      <td :class="classObject(coin.market_cap_usd)">${{ (coin.market_cap_usd/1000000000).toFixed(2) }}b</td>
      <td :class="classObject(coin.percent_change_7d)">${{ (coin.volume24/1000000000).toFixed(2) }}b</td>
    </tr>
  </table>
  <audio ref="audioAlert">
      <source src="assets/you_suffer.mp3" type="audio/mp3">
  </audio>
</template>

<style scoped>
th {
  font-size: smaller;
  font-weight: 300;
}
th img {
  width: 16px;
}
</style>
