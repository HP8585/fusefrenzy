<template>
<div class="fixed w-full bottom-0 bg-red-600 z-20 rounded-3xl " v-show="useStore().bottomSheet"
:style="`height: ${sheetHeight}px; transform: translateY(${sheetOffset}px)`"
@mousedown.prevent="startDrag" @mousemove.prevent="drag" @mouseup.prevent="stopDrag" @mouseenter="stopDrag" @touchstart.prevent="startDrag"
@touchmove="drag" @touchend="stopDrag"
>
<div class="bg-white cursor-pointer active:cursor-grab h-1.5 rounded w-10 mx-auto my-3" />
<div class="text-white mx-auto md:w-fit flex flex-col items-center justify-center px-3 md:px-0">
<h1 class="font-bold text-xl md:text-center mt-2">Do you know the rules?</h1>
<button @click="startG" @pointerup="startG" class="mx-auto w-fit mt-1 bg-gray-950 px-3 py-1 rounded hover:bg-gray-900 duration-75" v-show="sheetOffset >= 550">Yes, I do!</button>
<ul class="BS-menu">
    <li>
        <span>1. Bomb :</span>
        <p class="">The bomb will explode after the duration of its timer gets elapsed.
             By answering each question contingent on the difficulty of the question a few extra seconds as reward will be granted.

        </p>
    </li>
    <li>
        <span>2. Defusal :</span>
        <p class="">For defusing the bomb before detonation you'll have to find the answer lying in the clue sentence given to you</p>
        <p>For instantiation the answer of "Is used in air strikes during wars." is "Rocket"</p>
    </li>
    <li>
        <span>3. Scores :</span>
        <p class="">We have 2 rounds and each round has its own respective score. Each round has 5 disparate questions that by answering all of the 5 questions of the first round you'll find your way to the next round and 
            by asnwering the 5 questions of the second round you can observe your result. You can observe your scores' result at the end of the rounds at the Scores
            Table. You can vie with your pals to see who has the knack of saving more people by collecting more scores!
        </p>
    </li>
  
</ul>
<button @click="startG" @pointerup="startG" class="bg-gray-950 w-full rounded py-2 my-6 hover:bg-gray-900 duration-75">Got it!</button>
</div>


</div>
</template>

<script setup>
import { useStore } from '~/stores/user'
const emit = defineEmits(['start'])
const startG = ()=>{
    emit('start')
    useStore().bottomSheet = false
}

const sheetHeight = ref(700)
const sheetOffset = ref(550)
const dragData = reactive({
    isDragging: false,
    startY: 0,
    startOffset: 0
})

function startDrag(event){
    dragData.isDragging = true;
    dragData.startY = event.clientY || event.touches[0].clientY;
    dragData.startOffset = sheetOffset.value;
}

function drag(event){
    if(dragData.isDragging){
        const clientY = event.clientY ||event.touches[0].clientY;
        const deltaY = clientY - dragData.startY;
        sheetOffset.value = dragData.startOffset + deltaY
        const newOffset = dragData.startOffset + deltaY

        if(newOffset <= 0){
            sheetOffset.value = 0;
            dragData.isDragging = false;
            stopDrag()
        }else{
            sheetOffset.value = newOffset;
        }
    }
}

function stopDrag(){
    dragData.isDragging = false;
}
</script>