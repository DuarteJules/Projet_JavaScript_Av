let cartesFlip = document.querySelectorAll('.double-face')
let cartes = document.querySelectorAll('.carte')
let cartesFaceUp = []
let cartesFlipList = [...cartesFlip]

for( let i = 0; i<cartesFlipList.length; i++){
    cartesFlipList[i].addEventListener("click", flip)
}

function ComparaisonCarte(){
    cartesFlip.forEach(element => {
        element.addEventListener('click', function compare (){
            cartesFaceUp.push(element)
            if(cartesFaceUp.length === 2){
                motifCarte1 = cartesFaceUp[0].getAttribute('type')
                motifCarte2 = cartesFaceUp[1].getAttribute('type')
                if(motifCarte1 == motifCarte2){
                    console.log("NIQUE")
                    cartesFaceUp[0].removeEventListener('click', flip)
                    cartesFaceUp[1].removeEventListener('click', flip)
                    cartesFaceUp = []
                }else{
                    cartesFaceUp[0].classList.toggle("active")
                    cartesFaceUp[1].classList.toggle("active")
                    cartesFaceUp = []
                }
            }
        })
    });
}

function flip(event){
    this.classList.toggle("active");
}

//TIMER//

let second = 0, minute = 0;
let timer = document.querySelector(".timer")
let interval

function Timer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+ second+ " secs"
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
    },1000)
}


ComparaisonCarte()
Timer()
