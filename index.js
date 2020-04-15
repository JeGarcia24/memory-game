const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let firstCard, secondCard;
let cardMatch = [];
let lockBoard = false;
let cardNum = 18; // 12 cards
const resultDisplay = document.querySelector("#result");
const displayComment = document.querySelector("#words");
let data = [
        ["You're Awesome!"],
        ["That is Great!"],
        ["Unbelivable!"],
        ["Go for the GOLD!"],
        ["Success!"]
      ];




function flipCard() {
  if(lockBoard) return;
  if(this === firstCard) return; // avoid douclelick card

  this.classList.add("flip");//adding flip to class. ex class="memory-card" -> "memory-card flip"

    if(!hasFlippedCard) {
      //first click
      hasFlippedCard = true;
      firstCard = this;
      return;
    }
    secondCard = this; //secondCard = this; //2nd click // avoid douclelick card
    matchingCards();
}

function matchingCards(){

  if(firstCard.dataset.name === secondCard.dataset.name){
    score();
    winningComment();
    disabledCards();
   
  }else {
    displayComment.textContent = "Sorry, try again!";
    unflippedCards()
  }
}

function winningComment() {
  let shuffle = Math.floor(Math.random() * data.length);
  
  if(cardMatch.length/2 === 9){
    displayComment.textContent = "You're a WINNER!"
  } else {
    displayComment.textContent = data[shuffle];
  }
}

function score(){
  cardMatch.push(firstCard.dataset.name)
  cardMatch.push(secondCard.dataset.name)
  resultDisplay.textContent = cardMatch.length/2
  
}

function disabledCards() { // matched already
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard()
}

function unflippedCards(){ // not matched yet
  lockBoard = true; 
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    lockBoard = false;
    resetBoard();
    
  }, 1000)
}

function resetBoard() { // avoid douclelick card
  hasFlippedCard = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

(function shuffleCards(){
  cards.forEach(card => {
    let randomNum = Math.floor(Math.random() * cardNum) 
    card.style.order = randomNum; //I think this will work in a container with flex display. // assigning order number
  });
})() //()() means IIFE or Immediately Invoked Function Expressions // expressions will be executed right after its definition

cards.forEach(cards => cards.addEventListener('click', flipCard))




