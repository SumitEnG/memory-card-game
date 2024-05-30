//getting all the play buttons
const playButton1 = document.querySelector('.playButton-1')
const playButton2 = document.querySelector('.playButton-2')
const playButton3 = document.querySelector('.playButton-3')

const playContainer1 = document.querySelector('.container-1')
const playContainer2 = document.querySelector('.container-2')
const playContainer3 = document.querySelector('.container-3')

//adding eventListener to playbuttons to get the playing window
playButton1.addEventListener('click',()=>{
    playContainer1.classList.add('visibility')
    // suffleCard('.img-1')
    startTimer()
})

playButton2.addEventListener('click',()=>{
    playContainer2.classList.add('visibility')
    // suffleCard('.img-2')
})

playButton3.addEventListener('click',()=>{
    playContainer3.classList.add('visibility')
    // suffleCard('.img-3')
})



const cards = document.querySelectorAll('.box')//getting all the cards

let cardOne,cardTwo;

let disableFlip = false

let matchedCards = 0;

let score = 0;

let pointScore=0

let flips = 25;

let flipScore = 0;

cards.forEach((card)=>{
    card.addEventListener('click',flipCard) //adding a event listener that triggered clicking of a card
})

function flipCard(card){
    const clickedCard = card.target //getting the clicked card

    const lostMsg = document.querySelector('.lost-msg-1')//checking if user lost the game then he 
    const lostMsg2 = document.querySelector('.lost-msg-2')//checking if user lost the game then he 
    if(lostMsg.classList.contains('active') ){           //would not able to flip
        return
    }

    if(lostMsg2.classList.contains('active') ){      
        return
    }

    //if currently clicked card and first clicked card is not equal
    //and two cards were already matched then only cards will flipped 
    if((clickedCard !== cardOne ) && !disableFlip){
        clickedCard.classList.add('flip') //add a claslist (flip) to flip the card when clicked by user
        
        if(playContainer3.classList.contains('visibility')){
          flips--;
          const flipLeft = document.querySelector('.flip-left')
          flipLeft.innerHTML = flips
          if(flips === 0)
            lostMsg2.classList.add('active')
        }
        
        
        
        //capturing 1st and 2nd card that is flipped
        if(!cardOne){
            cardOne = clickedCard;
            return
        }
        cardTwo = clickedCard
        disableFlip= true

        //getting source of first clicked and 2nd clicked card images
        let cardOneImg = cardOne.querySelector('.back-img').src
        let cardTwoImg = cardTwo.querySelector('.back-img').src
        console.log(cardOneImg,cardTwoImg)
        matchCards(cardOneImg,cardTwoImg)
    }
}

function matchCards(img1,img2){
    //check whether both images are same or not if same then remove the flip event and return
    if(img1 == img2){
        matchedCards++ //increment the matchcards by 1

        if(playContainer2.classList.contains('visibility')){
            pointScore = pointScore + 100;
            calcPointForContainer2()
        }

        if(playContainer3.classList.contains('visibility')){
            flipScore = 25-flips
            calcPointForContainer3()
        }
        
        if(matchedCards == 8){ //ifmatched cards is equal to 8 means all cards are openedand user wins
            matchedCards = 0;
            if(playContainer1.classList.contains('visibility')){
                clearInterval(timer)
                score = 119 - sec;

                calcPointForContainer1()

                const winMsgContainer = document.querySelector('.winMsgContainer')
                winMsgContainer.classList.add('active')
            }
            
            if(playContainer2.classList.contains('visibility')){
                const winMsgContainer2 = document.querySelector('.winMsgContainer2')
                winMsgContainer2.classList.add('active')

                calcPointForContainer2()
            }

            if(playContainer3.classList.contains('visibility')){
                const winMsgContainer3 = document.querySelector('.winMsgContainer3')
                winMsgContainer3.classList.add('active')
               
                calcPointForContainer3()
            }
        }

        cardOne.removeEventListener('click',flipCard)
        cardTwo.removeEventListener('click',flipCard)
        cardOne = ""
        cardTwo = ""
        disableFlip = false;
        return;
    }

    if(playContainer3.classList.contains('visibility')){
        flipScore = 25-flips
        calcPointForContainer3()
    }

    

    if(playContainer2.classList.contains('visibility')){
      pointScore = pointScore-25;
      calcPointForContainer2()

    }
    
    //adding shake effect to the cards if they are not matching after 400ms
    setTimeout(()=>{
        cardOne.classList.add('shake')
        cardTwo.classList.add('shake')
    },400)

    //remove shake and flip after 1.2s
    setTimeout(()=>{
        cardOne.classList.remove('shake' , 'flip')
        cardTwo.classList.remove('shake' , 'flip')
        cardOne=""
        cardTwo=""
        disableFlip = false;
    },1200)
}

//function to suffle cards
function suffleCard(imgQuery){
    const arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    //suffle the array
    for(let i=0; i<arr.length; i++){
        let randomNo = Math.floor(Math.random()* arr.length)

        let temp = arr[i]
        arr[i] = arr[randomNo]
        arr[randomNo] = temp
    }
    const images = document.querySelectorAll(imgQuery)

    //Now putting the suffle images
    for(let i=0 ; i<arr.length ; i++){
        images[i].src = `/assets/img-${arr[i]}.png`
    }
}


//timer function
let timer;
let sec = 120;
function startTimer(){
    sec=120;
    const ele = document.querySelector('.time-left')
    timer = setInterval(()=>{
        ele.innerHTML = `${sec} sec`
        sec--

        if(sec === -1){
            clearInterval(timer)
            const lostMsg = document.querySelector('.lost-msg-1')
            lostMsg.classList.add('active')
        }

    },1000)
    console.log(timer)
}


//restart code
const playAgainButton = document.querySelectorAll('.playAgain')
const restartButton = document.querySelectorAll('.restartButton')
const tryAgainButton = document.querySelectorAll('.tryAgain')


playAgainButton.forEach((e)=>{
    e.addEventListener('click',restartGame)})

restartButton.forEach((e)=>{
        e.addEventListener('click',restartGame)})

tryAgainButton.forEach((e)=>{
            e.addEventListener('click',restartGame)})

function restartGame(){
      
    matchedCards = 0;
    disableFlip = false; 
    console.log('mh')
    
    if(playContainer1.classList.contains('visibility')){
        suffleCard('.img-1')
        const winMsgContainer = document.querySelector('.winMsgContainer')
        if(winMsgContainer.classList.contains('active'))
           winMsgContainer.classList.remove('active')

        const lostMsgContainer = document.querySelector('.lost-msg-1')
        if(lostMsgContainer.classList.contains('active'))
            lostMsgContainer.classList.remove('active')

        startTimer()
        score = 0;
        calcPointForContainer1()
    }

    if(playContainer2.classList.contains('visibility')){
        suffleCard('.img-2')
        const winMsgContainer2 = document.querySelector('.winMsgContainer2')
        if(winMsgContainer2.classList.contains('active'))
           winMsgContainer2.classList.remove('active')

        pointScore = 0;
        calcPointForContainer2()
    }

    if(playContainer3.classList.contains('visibility')){
        suffleCard('.img-3')
        const winMsgContainer3 = document.querySelector('.winMsgContainer3')
        if(winMsgContainer3.classList.contains('active'))
           winMsgContainer3.classList.remove('active')

        const lostMsgContainer = document.querySelector('.lost-msg-2')
        if(lostMsgContainer.classList.contains('active'))
            lostMsgContainer.classList.remove('active')

        flips = 25
        flipScore = 0
        calcPointForContainer3()
    }

    cards.forEach((card)=>{
            card.classList.remove('flip');
            card.addEventListener('click',flipCard);
    })
    cardOne = ""
    cardTwo = ""
}

//back to main menu 

const backToMainMenuButton =document.querySelectorAll('.backToMainMenu')
const mainMenuButton = document.querySelectorAll('.mainMenuButton')
const goToMenuButton = document.querySelectorAll('.goToMenu')

backToMainMenuButton.forEach((e)=>{
    e.addEventListener('click',returnToMainMenu)
})

mainMenuButton.forEach((e)=>{
    e.addEventListener('click',returnToMainMenu)
})

goToMenuButton.forEach((e)=>{
    e.addEventListener('click',returnToMainMenu)
})


function returnToMainMenu(){
    restartGame()
    if(playContainer1.classList.contains('visibility')){
        clearInterval(timer)
    }
   
    const container = document.querySelectorAll('.container')
    container.forEach((e)=>{
        e.classList.remove('visibility')
    })
}


function calcPointForContainer1(){
    const scoreContainer = document.querySelector('.score')
    scoreContainer.innerHTML = score + ' sec';
}
function calcPointForContainer2(){
    const scoreContainer = document.querySelector('.score-2')
    scoreContainer.innerHTML = pointScore;
}
function calcPointForContainer3(){
    const flipscoreContainer = document.querySelector('.score-3')
        flipscoreContainer.innerHTML = flipScore;
}