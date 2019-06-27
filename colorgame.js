var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var header = document.querySelector(".header");
var guess = document.querySelector("#guessColor"); //guess this color
var message = document.querySelector("#message"); //if wrong or right
var resetButton = document.querySelector("#reset"); 
var easyButton = document.querySelector("#easy");
var hardButton  = document.querySelector("#hard");
var modeButtons = document.querySelectorAll(".mode");




init();


/***************************FUNCTIONS****************************************************/
function init(){
    setUpButtons();
    initializeSquares();
    resetGame();
}

function initializeSquares(){
    //checking clicking color
    for(let i = 0; i<squares.length; i++){
        squares[i].addEventListener("click", function(){
            let clickedColor = this.style.backgroundColor;
                if(pickedColor===clickedColor){
                    header.style.backgroundColor = pickedColor;
                    changeColors(pickedColor);
                    message.textContent = "Congrats!!"
                    resetButton.textContent = "Play Again?"
                }else{
                    //remove the square, changing the background to the body background so it blends
                    this.style.backgroundColor = document.body.style.backgroundColor;
                    message.textContent = "Try Again";
                }
        });
    }
}

function setUpButtons(){
    //event listeners
    for(let i = 0; i<modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            resetGame();
        });
    }

    //reset button
    resetButton.addEventListener("click",function(){
        resetGame();
    });
}

function resetGame(){
    colors = generateColors(numSquares);
    pickedColor = pickColor();
    guess.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    for(let i = 0; i<squares.length; i++){
        if(colors[i]){
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i]; //initialize colors
        }else{
            squares[i].style.display = "none";
        }
    }
    message.textContent = "";
    header.style.backgroundColor = document.body.style.backgroundColor;
}


//changing the color to pickedColor
function changeColors(color){
    for(let i = 0; i<squares.length; i++){
        squares[i].style.backgroundColor = color;
    }
}

//picking a random color
function pickColor(){
    //pick a randmom color from colors array
    let rand = Math.floor(Math.random()*colors.length);
    return colors[rand];
}

//generate random colors
function generateColors(number){
    let result = [];
    for(let i = 0; i<number; i++){
        result.push(generateRgb());
    }
    return result;
}

//generate rgb string
function generateRgb(){
    
    let r  =Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    let res = "rgb(" + r + ", " + g +", " + b +")";
    return res;
}
