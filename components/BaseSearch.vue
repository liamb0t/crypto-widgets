<script setup>
const emit = defineEmits(['selectCoin'])

const searchQuery = ref('')
const start = ref(0)

const coin = ref()

const { data, refresh } = await useFetch(`/api/tickers/`, {
    query: {start: start, limit: 100}
})

const results = ref(data.value.data.slice(0, 10))

function search() {
    if (searchQuery.value) {
        results.value = data.value.data.filter(obj => obj.nameid.includes(searchQuery.value))
    }
    else {
        results.value = data.value.data.slice(0, 10)
    }
}

function onSelect(coin) {
    emit('selectCoin', coin)
    searchQuery.value = ''
    results.value = data.value.data.slice(0, 10)
    document.querySelector('#main').blur()
}

</script>

<template>
    <div id="main" class="relative" tabindex="0">
        <input type="text" v-model="searchQuery" @input="search" placeholder="Search Cryptos" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <div id="dropdown" class="absolute w-full max-h-48 overflow-y-scroll z-999">
            <div 
                @click="onSelect(result.id)"
                class="flex items-center bg-white hover:bg-zinc-100 hover:cursor-pointer p-2"
                v-for="result in results" 
                :key="result.id" 
            >
                <img class="h-4 mr-4" :src="`https://www.coinlore.com/img/20x20/${result.nameid}.png`" alt="">
                <div class="mr-2 font-bold">{{ result.name }}</div>
                <div class="text-xs">{{ result.symbol }}</div>
            </div>
        </div>
    </div>
 
</template>
<style scoped>
#main #dropdown {
    opacity: 0;
    visibility: hidden;
}
#main:focus-within #dropdown {
    opacity: 1;
    visibility: visible;
}
</style>