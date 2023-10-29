import bombData from '~/bomb_data.json'
import { useStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
export const initGame = ()=>{

    const { currentStage, imgSrc, timer } = storeToRefs(useStore())
    
    let countdownInterval;
    const stageIndex = ref(0)
    const defused = ref(false)

    const inputAnswer = ref(null)
    const submitted = ref(false)

watchEffect(()=>{
    if(defused.value){
        stageIndex.value++;
        currentStage.value = shuffleObjects.value[stageIndex.value]
        submitted.value = false
        setTimeout(() => {
            defused.value = false;
        }, 2000);
    };
   

})

const shuffleObjects = computed(() => {
    const objectsCopy = [...bombData]
    for (let i = objectsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[objectsCopy[i], objectsCopy[j]] = [objectsCopy[j], objectsCopy[i]]
    }
    return objectsCopy
  })

const checkAnswer = ()=>{
    if(!useStore().gameEnded){
        if(inputAnswer.value && currentStage.value && inputAnswer.value.toLowerCase() === currentStage.value?.answer.toLowerCase()){
            timer.value += currentStage.value?.reward
            defused.value = true
            submitted.value = false
            inputAnswer.value = null;
            if(useStore().round === 1){
                useStore().score1 += 12
                useStore().onQ1++;
                if(useStore().onQ1 === 6){
                    useStore().onQ1--;
                    useStore().endRound = true;
                    clearInterval(countdownInterval)
                }else{
                
                }
            }else if(useStore().round === 2){
                useStore().score2 += 12;
                useStore().onQ2++;
                if(useStore().onQ2 === 6){
                    useStore().onQ2--;
                    useStore().won = true;
                    useStore().confetti = true;
                    useStore().gameEnded = true;
                    clearInterval(countdownInterval)
                }else{
                    
                }
            }
            
        }else{
            console.log('wrong answer');
        }
    }else{
        alert('sorry but the game has ended!')
    }
  
}

const gameOver = ()=>{
    if(imgSrc.value === 'https://media.tenor.com/O6nUTInmj6AAAAAi/bomb-explode.gif'){
    imgSrc.value = 'https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif'
}else if(imgSrc.value === 'https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif'){
    imgSrc.value = 'https://i.giphy.com/media/26BRx71hqRexBe7Wo/giphy.webp'
}else if(imgSrc.value === 'https://i.giphy.com/media/26BRx71hqRexBe7Wo/giphy.webp'){
    imgSrc.value = 'https://media.tenor.com/ptNG8DQFPD4AAAAj/explotion-explode.gif'
}else if(imgSrc.value === 'https://media.tenor.com/ptNG8DQFPD4AAAAj/explotion-explode.gif'){
    imgSrc.value = 'https://i.gifer.com/origin/d7/d7ac4f38b77abe73165d85edf2cbdb9e_w200.gif'
}
}

const isPaused = ref(false)


const singleBeep = ref(null)
const beep = ref(null)
const explosion = ref(null)
const siren = ref(null)


const formattedMinutes = ref('01'),
formattedSeconds = ref('00')

function updateCountdown() {
  // Calculate the minutes and seconds
   let minutes = Math.floor(timer.value / 60);
  let seconds = timer.value % 60;

   formattedMinutes.value = minutes.toString().padStart(2, '0');
   formattedSeconds.value = seconds.toString().padStart(2, '0');

  timer.value--;
  
}
    var exploded = true;

    function gameStart(){
        timer.value = 60
         exploded = true;
         
        currentStage.value = shuffleObjects.value[stageIndex.value]
        
         countdownInterval = setInterval(() => {
            if(!isPaused.value){
        updateCountdown()
         if(timer.value > 1){
            
            if(useStore().audio){
        singleBeep.value.play()
            }
      }else if(timer.value < 1){
        
        if(useStore().audio && exploded){
        explosion.value.currentTime = 0;
        explosion.value.play()
        exploded = false;
        }
        gameOver()
        
       if(useStore().round === 1 && useStore().onQ1 === 2){
        useStore().endRound = true
        clearInterval(countdownInterval)
       }else{
        useStore().gameEnded = true;
        clearInterval(countdownInterval)
       }

      }else{
        beep.value.currentTime = 0;
        if(useStore().audio){
        beep.value.play()
        }
      }

    }
    }, 1000);
   
    }
    const startGame = ()=>{
        siren.value.currentTime = 0
        currentStage.value = shuffleObjects.value[stageIndex.value]
        useStore().gameEnded = false
        useStore().endRound = false
            useStore().round++;
        
        
        if(useStore().round === 2){
            gameStart()
            useStore().imgSrc = 'https://media.tenor.com/O6nUTInmj6AAAAAi/bomb-explode.gif';
        }else{
            gameStart()
        }
    }

    const playAgain = ()=>{
        siren.value.currentTime = 0
        currentStage.value = shuffleObjects.value[stageIndex.value]
        useStore().round = 1;
        useStore().score1 = 0; useStore().score2 = 0 ; useStore().onQ1 = 1; useStore().onQ2 = 1;
        useStore().gameEnded = false;
        useStore().won = false;
        if(countdownInterval){
            clearInterval(countdownInterval)
        }
        gameStart();
        imgSrc.value = 'https://media.tenor.com/O6nUTInmj6AAAAAi/bomb-explode.gif'

       
    }

    watch(()=> useStore().won, ()=>{
        if(useStore().won){
            useStore().confetti = true;
            setTimeout(() => {
                useStore().confetti = false;
            }, 7000);
        }
    })
    watch(()=> useStore().onMenu, ()=>{
        if(useStore().onMenu){
            isPaused.value = true
            siren.value.pause()
        }else{
            isPaused.value = false;
        }
    })
    watch(()=>timer.value, ()=>{
        if(timer.value <= 15){
                if(useStore().audio){
                    
                siren.value.play()
                }
               }else{
                console.log('fuck fuckk');
                siren.value.pause()
               }
    })
return{
    checkAnswer,
    currentStage,
    stageIndex,
    inputAnswer,
    imgSrc,
    timer,
    gameOver,
    shuffleObjects,
    startGame,
        singleBeep,
        beep,
        explosion,
        formattedMinutes,
        formattedSeconds,
        countdownInterval,
        playAgain,
        siren
}
}