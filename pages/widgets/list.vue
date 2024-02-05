<script setup>

const route = useRoute()
 
const width = route.params.width
const height = route.params.height
const coin = route.params.coinId
const darkMode = route.params.dark
const cols = route.params.cols
const marketCap = route.params.marketcap
const percentChange7d = route.params.percent7d
const vol24h = route.params.volume24h

const settings = {
    'darkMode': darkMode,
    'coin': coin,
    'width': width,
    'height': height,
    'cols': cols,
    'market_cap_usd': marketCap,
    'percent_change_7d': percentChange7d,
    'volume24': vol24h
}

</script>

<template>
  <WidgetsList :widgetSettings="settings"/>
</template>