<script setup>

const emit = defineEmits(['addedAlert'])

const widgets = ref()

function addAlert() {
    emit('addedAlert', alert.value)
    alert.coin = ''
    alert.alertPrice = ''
}
</script>

<template>  
    <h1>{{ alert }}</h1>
    <BaseSearch @select-coin="(option) => alert.coin = option" v-model="alert.coin"></BaseSearch>
    <BaseInput v-model="alert.alertPrice"></BaseInput>
    <button @click="addAlert()">Add alert</button>
</template>  