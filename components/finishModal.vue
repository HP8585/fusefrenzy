<template>
    <Transition name="fade">
<div class="bg-red-600 py-2 px-3 rounded z-20 text-white shadow-xl absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]">
    <h1 class="font-bold text-[1.4rem] text-center">Finish</h1>
    <h1 class="font-semibold text-[1.1rem]">{{ useStore().won ? "Hooray🥳🎉 You've saved so many innocent people!":'Oh, how sad it is to witness so many inncoent children and women die😔' }}</h1>
    <br>
    <h1 class="border border-b-0 text-center font-bold">Scores</h1>
    <table class="border w-full">
        <tr>
            <td>Round 1</td>
            <td>{{ useStore().score1 }}</td>
        </tr>
        <tr>
            <td>Round 2</td>
            <td>{{ useStore().score2 }}</td>
        </tr>
        <tr>
            <td>Total</td>
            {{ useStore().score1 + useStore().score2 }}
        </tr>
    </table>
    <br>
    <button @click="$emit('replay')" class="bg-gray-950 rounded hover:bg-gray-900 duration-100 w-full h-10" >Play again</button>
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