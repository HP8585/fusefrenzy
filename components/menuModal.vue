<template>
    <Transition name="fade">
<div class="absolute z-20 rounded shadow-2xl text-white top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-red-600 py-2 px-1.5">
    <div class="flex flex-col px-3">
    <h1 class="text-center text-2xl font-bold">Menu</h1>
    <br>
    <ul class="menu flex flex-col gflex items-center justify-center gap-1">
        <li class="" @click.stop="useStore().audio = !useStore().audio">
            <span>Audio Effects</span>
            <i :class="useStore().audio ? 'fa fa-volume-high': 'fa fa-volume-xmark'" />
        </li>
        <li @click="$emit('restart')">
            <span>Restart Game</span>
            <i class="fa fa-arrows-rotate" />
        </li>
        <li @click.stop="$emit('close')">
            <span>close</span>
            <i class="fa fa-times" />
        </li>
    </ul>
</div>
</div>
</Transition>
</template>

<script setup>
import { useStore } from '~/stores/user'
const emits = defineEmits(['close'])
onMounted(()=>{
    window.addEventListener('click', ()=>{
        emits('close')
    })
})
</script>

<style scoped>

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>