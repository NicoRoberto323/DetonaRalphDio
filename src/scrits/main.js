const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        aliado: document.querySelector(".aliado"),
       
    },
    values:{
        timeridEnemy: null,
        timeridAliado: null,
        gameVelocity: 1000,
        hitpositionEnemy: 0,
        hitpositionAliado:0,
        result: 0,
        curretTime: 60,
    },
    actions:{ 
        countDownTimerId: null,
     }
};

function startCountDown() {
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent =state.values.curretTime;
    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId);  
        clearInterval(state.values.timeridEnemy);
        clearInterval(state.values.timeridAliado);
        state.view.squares.forEach((square) => {
            square.classList.remove("enemy", "aliado");
        });
        alert("Game Over! O seu resultado foi " + state.values.result);
    }
}


function playSound1(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function playSound2(){
    let audio = new Audio("./src/audios/iuo.mp3");
    audio.volume = 0.2;
    audio.play();
}

//Enemy//
function randomSquareEnemy() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    });
    
    let randoNumber = Math.floor(Math.random() *9);
    let randomSquareEnemy = state.view.squares[randoNumber];
    randomSquareEnemy.classList.add("enemy");
    state.values.hitpositionEnemy = randomSquareEnemy.id;
}

function moveEnemy(){
    state.values.timeridEnemy = setInterval(randomSquareEnemy, state.values.gameVelocity );
}

//Aliado//
function randomSquareAliado() {
    state.view.squares.forEach((square)=>{
        square.classList.remove("aliado");
    });
    
    let randoNumber = Math.floor(Math.random() *9);
    let randomSquareAliado = state.view.squares[randoNumber];
    randomSquareAliado.classList.add("aliado");
    state.values.hitpositionAliado = randomSquareAliado.id;
}

function moveAliado(){
    state.values.timeridAliado = setInterval(randomSquareAliado, state.values.gameVelocity );
}

function addListenerHitBox(){
    //Enemy
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitpositionEnemy){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitpositionEnemy = null;
                playSound1();
            }
            else if(square.id === state.values.hitpositionAliado){
                state.values.result--;
                state.view.score.textContent = state.values.result;
                state.values.hitpositionAliado = null;
                playSound2();
            }
        });
    });

}

function init() {
    moveEnemy();
    moveAliado();
    addListenerHitBox();
}

document.querySelector("#start-button").addEventListener("click", () => {
    init();
    startCountDown();
    document.querySelector("#start-button").style.display = "none";
});
