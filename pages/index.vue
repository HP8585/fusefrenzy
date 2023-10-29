<template>
    
        <bottomSheet @start="startGame" />
    
    <ConfettiExplosion class="absolute left-[50%] translate-x-[-50%]" v-if="confetti" :particleSize="12" :duration="4000" :particleCount="250" />
    <finish-modal @replay="playAgain" v-show="useStore().gameEnded" />
    <end-round-modal @replay="startGame" v-show="useStore().endRound"/>
    <MenuModal @restart="playAgain" @close="onMenu = false" v-show="onMenu" />
    <Audio src="explosion.mp3" id="explosion" hidden />
    <Audio src="single-beep.mp3" id="single" hidden />
    <Audio src="beep.mp3" id="beep" hidden />
    <Audio src="siren.mp3" id="siren" hidden />
   
<div class=" h-screen py-4">
    
    
    <div class="mx-auto w-screen px-3 md:px-0 md:w-[40em] flex flex-col gap-7 items-center justify-center ">
        <header class="border-b w-full flex items-center justify-between text-white">
            <i @click.stop="onMenu = true" class="fa fa-bars text-2xl cursor-pointer" />
            <div class="flex gap-3">
                <div class="flex gap-2 items-center">
                    <span>Round</span>
                    <div>
                    <i class="fa fa-circle mr-1"/>
                    <i class=" fa-circle" :class="useStore().round === 1 ? 'fa-regular' : 'fa'" />
                </div>
                </div>
                <div>
                    <span>Score :</span>
                    <span>{{ useStore().round === 1 ? useStore().score1 : useStore().score2 }}</span>
                </div>
            </div>
        </header>
        <img :src="imgSrc" class="max-w-[15em]">
        <div class="flex relative items-center justify-center">
    <img src="../assets/Timer.png" class="relativ">
    <div class=" absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[3rem] w-fit whitespace-nowrap" style="font-family: 'Pixelify Sans';">{{ formattedSeconds }} : {{ formattedMinutes }}</div>
</div>
    </div>

<div class="flex flex-col mt-10 text-white bg-red-600 w-[20em] px-3 py-3 rounded mx-auto">
    <span>
        {{ currentStage?.clue }}
    </span>
    <input @keypress.enter="answerButton.click()" v-model="inputAnswer" type="text" class="border text-black px-2 py-1 my-2 outline-none border-none rounded">
    <button ref="answerButton" class="bg-black rounded py-2 text-white my-3"  @click="checkAnswer">Submit Answer</button>
</div>
    <div class="text-white mx-auto w-fit mt-2">{{ useStore().round === 1 ? useStore().onQ1 : useStore().onQ2 }} / 5</div>
</div>

</template>

<script setup>
import ConfettiExplosion from 'vue-confetti-explosion'
import { useStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
const { currentStage, imgSrc, timer, onMenu, confetti } = storeToRefs(useStore())
const { stageIndex, checkAnswer, inputAnswer, gameOver, shuffleObjects, beep, singleBeep, explosion, siren, startGame, playAgain, formattedMinutes, formattedSeconds } = initGame()


const answerButton = ref(null)

onMounted(() => {
    alert('This game is all made by "Hussain Panahy" !')
    singleBeep.value = document.getElementById('single')
    beep.value = document.getElementById('beep')
    explosion.value = document.getElementById('explosion')
    siren.value = document.getElementById('siren')
})

</script>