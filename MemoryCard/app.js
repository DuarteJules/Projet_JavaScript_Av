let cartesFlip = document.querySelectorAll('.double-face')
let cartes = document.querySelectorAll('.carte')
let popup = document.getElementById("popup1")
let grille = document.querySelector(".grille")

let cartesList = [...cartes] // liste des cartes
let cartesFaceUp = [] //liste des cartes sélectionnées
let cartesFlipList = [...cartesFlip] // liste de toutes les cartes
let cartesFlipped = [] // liste des cartes retournées (qui ont matché)

for( let i = 0; i<cartesFlipList.length; i++){//permet de retourner la carte
    cartesFlipList[i].addEventListener("click", flip)
}

function ComparaisonCarte(){
    cartesFlipList.forEach(element => {
        element.addEventListener('click', function compare (){
            cartesFaceUp.push(element)
            if(cartesFaceUp.length === 2){
                motifCarte1 = cartesFaceUp[0].getAttribute('type')
                motifCarte2 = cartesFaceUp[1].getAttribute('type')
                if(motifCarte1 == motifCarte2){
                    console.log("NIQUE")
                    cartesFaceUp[0].removeEventListener('click', flip)
                    // cartesFaceUp[0].classList.toggle("unclickable")
                    cartesFaceUp[1].removeEventListener('click', flip)
                    // cartesFaceUp[1].classList.toggle("unclickable")
                    cartesFlipped.push(cartesFaceUp[0])
                    cartesFlipped.push(cartesFaceUp[1])
                    if(winCond() == true){
                        finDePartie()
                        cartesFlipped = []
                    }
                    cartesFaceUp = []
                }else if(motifCarte1 != motifCarte2 && cartesFaceUp.length == 2){
                    delayedFlip(cartesFaceUp[0],cartesFaceUp[1])
                    // cartesFaceUp[0].classList.toggle("active")
                    // cartesFaceUp[1].classList.toggle("active")
                    // cartesFlipped.push(cartesFaceUp[0])
                    // cartesFlipped.push(cartesFaceUp[1])
                    // noMatch(cartesFaceUp[0])
                    // noMatch(cartesFaceUp[1])
                    // setTimeout(() => {cartesFaceUp[0].classList.toggle("active") }, 300)
                    // setTimeout(() => {cartesFaceUp[1].classList.toggle("active") }, 300)
                    cartesFaceUp = []
                }
            }
        })
    });
}

function flip(event){//retourne une carte
    this.classList.toggle("active");
}

// function syncDelay(milliseconds){
//     var start = new Date().getTime();
//     var end=0;
//     while( (end-start) < milliseconds){
//         end = new Date().getTime();
//     }
// }
function delay(n){//créer un délai de n secondes
    return new Promise(function(resolve){
        setTimeout(resolve,n*1000);
    });
}

async function delayedFlip(carte1,carte2){//retourne la carte 1 seconde après
    await delay(1)
    carte1.classList.toggle("active")
    carte2.classList.toggle("active")
}

function finDePartie(){//arrête et récupère le temps
    clearInterval(interval);
    let tempsFinal = timer.innerHTML ;
    document.getElementById("temps").innerHTML = tempsFinal;
    popup.classList.toggle("show");
}
function shuffleCards(){//mélange les cartes
    while (grille.firstChild){
        grille.removeChild(grille.firstChild)
    }
    cartesList = [...cartes]
    // grille.querySelectorAll('*').forEach(n => n.remove())
    while ( cartesList.length > 0){
        let taille = cartesList.length
        let index = randomNbr(taille-1)
        grille.appendChild(cartesList[index])
        cartesList.splice(index, 1)
    }
}

function randomNbr(max){ //génère un nombre aléatoire
    return Math.floor(Math.random()*max)
}

// function sleep(milliseconds) {
//     const date = Date.now();
//     let currentDate = null;
//     do {
//     currentDate = Date.now();
//     } while (currentDate - date < milliseconds);
// }
// function noMatch(carte){
//     carte.classList.toggle("active")
// }

//VICTOIRE//

function winCond(){
//renvoie true si toutes les cartes sont retournées
    // cartesFlipList.forEach(element => {
    //     if(element.classList.contains("unclickable") == true){
    //         cartesFlipped.push(element)
    //         console.log(cartesFlipped.length)
    //     }if(cartesFlipped.length == 12){
    //         console.log("HAHAHAHHAHAH")
    //     }
    // });
    if(cartesFlipped.length == 12){
        console.log('victoire')
        return true
    }return false
}
//TIMER//

let second = 0, minute = 0;
let timer = document.querySelector(".timer")
let interval

function Timer(){
    //lance le timer
    interval = setInterval(function(){
        timer.innerHTML = minute+" mins "+ second+ " secs"
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
    },1000)
}

// function replay(){ //l'event listener marche une foi sur deux pour une raison obscure
//     // quand je clique sur replay
//     //je veux retourner les cartes
//     //mélanger les cartes et réattribuer un event sur le click
//     //cacher le pop up 
//     shuffleCards();
//     cartesList = [...cartes] // liste des cartes
//     cartesFaceUp = [] //liste des cartes sélectionnées
//     cartesFlipList = [...cartesFlip] // liste de toutes les cartes
//     cartesFlipped = [] // liste des cartes retournées (qui ont matché)

//     cartesFlipList = [...cartesFlip]
//     cartesFlipList.forEach(element => {
//         element.classList.toggle("active")
//         element.addEventListener("click", function e(){
//             element.classList.toggle("active")
//         }
//     );
// })
//     second = 0
//     minute = 0
//     Timer()
//     popup.classList.toggle("show")
//ComparaisonCarte()
//Timer()
// }
//y'avait selection carte à un moment mais je l'ai suppr oupsi
shuffleCards()
ComparaisonCarte()
Timer()


function startGame(){
    location.reload()
}
