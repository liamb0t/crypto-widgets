<script setup>
const props = ({
    widget: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <div class="fixed">
       
        <div>
            <ModalEditor :widget="widget"/>
        </div>
    </div>
</template>