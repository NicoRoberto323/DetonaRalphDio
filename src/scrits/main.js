const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values:{
        timerid: null,
        gameVelocity: 1000,
        hitposition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{ 
        countDownTimerId: setInterval(countDown, 1000),
     }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent =state.values.curretTime;
    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId),
        alert("Game Over! O seu resultado foi" + state.values.result);
    }
}


function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function randomSquare() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    
    let randoNumber = Math.floor(Math.random() *9);
    let randomSquare = state.view.squares[randoNumber];
    randomSquare.classList.add("enemy");
    state.values.hitposition = randomSquare.id;
}

function moveEnemy(){
    state.values.timerid = setInterval(randomSquare, state.values.gameVelocity );
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitposition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitposition = null;
                playSound();
            }
        });
    });
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();