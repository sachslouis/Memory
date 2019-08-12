const cards = document.querySelectorAll(".memory-card");        //selector for all cards

let hasFlippedCard = false;                                     //boolean set to false
let lockBoard = false;                                          //boolean set to f, makes cards unclickable
let firstCard, secondCard;     //defines two cards
let numberCorrect = 0;         //number correct starts at 0
let totalCards = 12;           //equal to how many cards there are
let wrongGuesses = 0;

document.getElementById("counter").innerHTML='Number Correct: ' + numberCorrect;
document.getElementById("wrong").innerHTML='Wrong Guesses: ' + wrongGuesses;

function createCards(){
    let cardArray=["img/coke.jpeg", "img/coke.jpeg", "img/mushroom.jpeg", "img/mushroom.jpeg", "img/cheese.jpeg", "img/cheese.jpeg", "img/mango.jpeg", "img/mango.jpeg", "img/corn.jpeg", "img/corn.jpeg", "img/crunch.jpeg", "img/crunch.jpeg"]
    for( i=0; i<cardArray.length; i++){
        var card=document.createElement('card');
        card.className="memory-card";
        document.getElementsByClassName("memory-game").appendChild(card);
    }
}
createCards();

function flipCard() {          //defines function
    if (lockBoard) return;     //if the board is locked, nothing else can happen
    if (this === firstCard)    //if you are clicking on the first card again, return and end function
        return;                
    this.classList.add('flip');  //add "flip" as a class to the clicked card

    if (!hasFlippedCard) {   //if hasFlippedCard is not true (default), no card has been flipped
        hasFlippedCard = true; //so set the boolean to true, and make the card clicked equal to firstCard
        firstCard = this;
        
        return;
    }
    secondCard = this;  //if hasFlippedCard is true it skips that part and the card clicked is secondCard

    checkForMatch(); //and now checks for a match
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework ===   //checks if the two cards are equal
        secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards(); //if they are a equal, disable those two cards. else, unflip 

}

function disableCards() {       //this function disables the cards
    numberCorrect=numberCorrect+2;  //it adds two the other overall numberCorrect variable
    document.getElementById("counter").innerHTML='Number Correct: ' + numberCorrect;
    if(numberCorrect===totalCards){ //and if numberCorrect is the same as the total number of cards, its a win
        win();
    }
    firstCard.removeEventListener('click', flipCard);  //remove event listener for the chards, so they cant be used
    secondCard.removeEventListener('click', flipCard);

    resetBoard(); //and clears variables from that turn
}

function unflipCards() {  //if the cards are not equal
    lockBoard = true; //lock the board
    wrongGuesses = wrongGuesses+1;
    document.getElementById("wrong").innerHTML='Wrong Guesses: ' + wrongGuesses;

    setTimeout(() => { 
        firstCard.classList.remove('flip'); //remove class flip from them
        secondCard.classList.remove('flip');
        resetBoard(); //and clears all variables from that turn
    }, 1000); //one second later
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false]; //resets hasFlippedCard and lockBoard boolems to false after each turn
    [fistCard, secondCard] = [null, null] //and clearsout first and second card variables
} //expalin es6 destructuring assignment
(function shuffle(){    
    cards.forEach(card=>{   
        let randomPos=Math.floor(Math.random()*12); //each gard gets a variable randomPos which is a random number
        card.style.order=randomPos;    //and order them by number
    });
})();

function win(){
    console.log("you win!")
    on();
}
function newGame(){
    off();
    numberCorrect=0;
    wrongGuesses=0;
    document.getElementById("counter").innerHTML='Number Correct: ' + numberCorrect;
    document.getElementById("wrong").innerHTML='Wrong Guesses: ' + wrongGuesses;
    cards.forEach(card => card.classList.remove('flip'));
    cards.forEach(card => card.addEventListener('click', flipCard));  // flipCard function is triggered by click

    (function shuffle(){    
        cards.forEach(card=>{   
            let randomPos=Math.floor(Math.random()*12); //each gard gets a variable randomPos which is a random number
            card.style.order=randomPos;    //and order them by number
        });
    })();
}
cards.forEach(card => card.addEventListener('click', flipCard));  // flipCard function is triggered by click


function on() {
    document.getElementById("overlay").style.display = "block";
  }
  
  function off() {
    document.getElementById("overlay").style.display = "none";
  }