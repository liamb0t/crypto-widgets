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

const { data, refresh } = await useFetch(`/api/ticker/?id=${props.widgetSettings.coin}`)
const interval =  1 * 60 * 1000
setInterval(refresh, interval)

const audioAlert = ref(null)

function classObject(filter) {
  return {
    'text-rose-500': filter < 0,
    'text-green-400': filter >= 0,
  }
}

watch(() => data.value.price_usd, (newPrice, oldPrice) => {
  if (newPrice < props.alert.alert_price) {
    // If the condition is met, play the audio
    playAudio();
  }
});

const playAudio = () => {
  if (audioAlert.value) {
    audioAlert.value.play();
  }
};

</script>

<template>  
    <tr>
        <div class="flex items-center">
          <img class="h-10 mr-4" :src="`https://www.coinlore.com/img/50x50/${data[0].nameid}.png`" alt="">
            <div class="flex flex-col">
                <td>{{ data[0].name }}</td>
                <td>{{ data[0].symbol }}</td> 
            </div>
        </div>
        <td>{{ data[0].price_usd }}</td>
        <td :class="classObject(data[0].percent_change_1h)">{{ data[0].percent_change_1h }}</td>
        <td :class="classObject(data[0].percent_change_24h)">{{ data[0].percent_change_24h }}</td>
        <td :class="classObject(data[0].percent_change_7d)">{{ data[0].percent_change_7d }}</td>
        <td>{{ widgetSettings.alertPrice }}</td>
    </tr>
    <audio ref="audioAlert">
        <source src="assets/you_suffer.mp3" type="audio/mp3">
    </audio>
</template>
