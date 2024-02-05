<script setup>

import { WidgetsSingle, WidgetsList, WidgetsTicker } from '#components'

const store = useWidgetsStore()

const widgets = [WidgetsSingle, WidgetsList, WidgetsTicker]

const { showModal } = storeToRefs(store)

const selectedWidget = ref(null)  

function openModal() {
  store.openModal()
}

function onClickWidget(widget) {
  selectedWidget.value = widget
  openModal()
}

const defaultSettings = {
  'coin': '90',
  'alertPrice': 40000,
}

</script>

<template>
  <nav>
      <h1 class="text-3xl font-bold underline">Crypto Widgets</h1>
  </nav>
  <main>
    <div class="grid grid-cols-3">
      <div 
        class="p-5 transition ease-in-out hover:cursor-pointer hover:bg-emerald-100 duration-300" 
        v-for="widget in widgets"
        @click="onClickWidget(widget)">
        <component :is="widget" :widgetSettings="defaultSettings" :isPreview="true"/>
      </div>
      <div id="modal-container" v-show="showModal === true">
        <ModalEditor :widget="selectedWidget"/>
      </div>
    </div>
  </main>
</template>
