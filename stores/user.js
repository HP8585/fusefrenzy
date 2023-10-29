import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => {
    return {
    gameEnded: false,
    imgSrc:'https://media.tenor.com/O6nUTInmj6AAAAAi/bomb-explode.gif',
    timer: 10,
    endRound : false,
    currentStage: null,
    countdownInterval: null,
    won: false,
    round: 0,
    score1: 0,
    score2: 0,
    onQ1 : 1,
    onQ2: 1,
    audio: true,
    onMenu: false,
    confetti: false,
    bottomSheet: true
    }
  },
})