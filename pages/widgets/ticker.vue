<script setup>

const route = useRoute()

const width = route.query.width
const height = route.query.height
const coin = route.query.coinId
const darkMode = route.query.dark
const cols = route.query.cols
const marketCap = route.query.marketcap
const percentChange7d = route.query.percent7d
const vol24h = route.query.volume24h

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
  <WidgetsSingle :widgetSettings="settings"/>
</template>