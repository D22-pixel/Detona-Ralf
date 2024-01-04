const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelectorAll("#time-left")[0],
        score: document.querySelectorAll("#score")[0],
    },
    values:{
        gameVelocity: 800,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown(){
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  if(state.values.curretTime <= 0){
    alert("Game Over! O seu resultado foi: " + state.values.result);
    clearInterval (state.actions.countDownTimerId);
    clearInterval (state.actions.timerId);
  }
}

function playSound(){
    let audio = new Audio("./src/audios/efeito.mp3");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
     });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
     });
}

function init(){
    addListenerHitBox();
}
init();