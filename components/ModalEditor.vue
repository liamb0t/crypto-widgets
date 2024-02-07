<script setup>

import { useWidgetsStore } from '@/stores/widgets';

const props = defineProps({
    widget: {
        type: Object,
        required: true,
    }
})

const store = useWidgetsStore()

const darkMode = ref(false)
const priceAlert = ref(null)
const soundAlert = ref()
const width = ref()
const height = ref()
const cols = ref([])
const marketCap = ref(true)
const vol24h = ref(true)
const percentChange7d = ref(true)

const widgets = {
        'WidgetsList': 'list',
        'WidgetsSingle': 'ticker',
        'WidgetsTicker': 'marquee',
    }

const previewSettings = ref({
    'darkMode': darkMode,
    'coin': 90,
    'priceAlert': 40000,
    'soundAlert': soundAlert,
    'width': width,
    'height': height,
    'cols': cols,
    'market_cap_usd': marketCap,
    'percent_change_7d': percentChange7d,
    'volume24': vol24h
})

const checkVals = computed(() => {
    const vals = [marketCap.value, vol24h.value]
    return vals.filter(val => val !== false).join(',')
})

const baseURL = 'http://localhost:3000'

const html = computed(() => {
    return `<iframe width="${width.value}"
    height="${height.value}"
    src="${baseURL}/widgets/${widgets[props.widget.__name]}?
    dark=${darkMode.value}
    &coinId=${previewSettings.value.coin}
    &marketcap=${marketCap.value}
    &volume24h=${vol24h.value}
    &percent7d=${percentChange7d.value}
    &width=${width.value}
    &height=${height.value}"
    </iframe>`.replace(/\s+/g, " ").replace(/\?\s+/g, "?").trim()

})

function copyText() {
    // Copy the selected text to the clipboard
    navigator.clipboard.writeText(html.value);
}

function setCoinId(id) {
   previewSettings.value.coin = id
}

function closeModal(event) {
    // Close modal only if the click is outside the modal content
    if (event.target.id === "modal-background") {
        store.closeModal()
    }
}

</script>

<template>
    <div id="modal-background" class="fixed inset-0 bg-black bg-opacity-50" @click="closeModal">
        <div id="modal" class="fixed w-5/12 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 border border-gray-300 shadow-md">
            <div>
                <component :is="widget" :widgetSettings="previewSettings" :isPreview="true" :darkMode="darkMode"/>
            </div>
          
           
            <div>
                <BaseSearch class="mt-1" @select-coin="setCoinId"/>
              
                <div class="flex">
                    <BaseInput class="mt-1" v-model="priceAlert" :placeholder="'Set price alert'"/>
                    <BaseInput class="mt-1" v-model="height" :placeholder="'Height'"/>
                    <BaseInput class="mt-1" v-model="width" :placeholder="'Width'"/>
                </div>
                <div class="flex justify-between">
                    <BaseCheckbox v-model="marketCap" :label="'Market Cap'"/>
                    <BaseCheckbox v-model="vol24h" :label="'Vol 24h'"/>
                    <BaseCheckbox v-model="percentChange7d" :label="'Change 7d'"/>
                    <BaseCheckbox v-model="darkMode" :label="'Dark theme'"/>
                </div>
            </div>
            <div class="relative mt-">
                <div class="absolute w-full flex justify-end pr-2 pt-2">
                    <img class="w-5 hover:cursor-pointer" src="~/assets/img/copy-icon.svg" alt="" @click="copyText">
                </div>
                <textarea v-if="widget" id="widgetcode" readonly style="resize: none;" rows="5" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">{{ html }}
                </textarea>
            </div>
        </div>
    </div>
</template>