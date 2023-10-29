<template>
    <Transition name="fade">
    <div class="bg-red-600 py-2 px-3 rounded z-20 text-white shadow-xl absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
        <h1 class="font-bold text-[1.4rem] text-center">Round 1 Finished</h1>
        <h1 class="font-semibold text-[1.1rem]">Are you ready for another breath-taking round?</h1>
        <br>
        <button @click="$emit('replay')" class="bg-gray-950 rounded hover:bg-gray-900 duration-100 w-full h-10" >Start round 2</button>
    </div>
</Transition>
    </template>
    
    <script setup>
    import { useStore } from '~/stores/user'
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