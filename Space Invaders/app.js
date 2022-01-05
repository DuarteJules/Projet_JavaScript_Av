
const container = document.querySelector('.grille');
const affichage = document.querySelector('h3');
let resultats = 0;
let toutesLesDivs;
let alienInvaders = [];
let tireurPosition = 229;
let direction = 1;
let width = 20;

function creationGrilleEtAliens(){

    let indexAttr = 0;

    for(i = 0; i < 240; i++){

        if(indexAttr === 0){
            const bloc = document.createElement('div');
            bloc.setAttribute('data-left', 'true');
            container.appendChild(bloc);
            indexAttr++;
        } 
        else if(indexAttr === 19){
            const bloc = document.createElement('div');
            bloc.setAttribute('data-right', 'true');
            container.appendChild(bloc);
            indexAttr = 0;
        } 
        else {
            const bloc = document.createElement('div');
            container.appendChild(bloc);
            indexAttr++;
        }

    }


    for(i = 1; i < 53; i++ ){

      if(i === 13){
          i = 21;
          alienInvaders.push(i);
      } else if (i === 33){
          i = 41;
          alienInvaders.push(i);
      } else {
          alienInvaders.push(i);
      }

    }
    console.log(alienInvaders);

    toutesLesDivs = document.querySelectorAll('.grille div');
    alienInvaders.forEach(invader => {
        toutesLesDivs[invader].classList.add('alien');
    })

    toutesLesDivs[tireurPosition].classList.add('tireur');

    console.log(toutesLesDivs)
}

creationGrilleEtAliens()

let downRight = true
let downLeft = true
function mouvementAliens(){

    for (let i = 0; i < alienInvaders.length; i++){
        if (toutesLesDivs[alienInvaders[i]].getAttribute('data-right') === 'true'){
            if(downLeft == true){
                direction = 20
                setTimeout(()=>{
                    downLeft = false
                },100)
            }
            else if (downLeft== false){
                direction = -1
            }
            downRight = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++){
        if (toutesLesDivs[alienInvaders[i]].getAttribute('data-left') === 'true'){
            if(downRight == true){
                direction = 20
                setTimeout(()=>{
                    downRight = false
                },100)
            }
            else if (downRight== false){
                direction = 1
            }
            downLeft = true
        }
    }

    for (let i = 0; i < alienInvaders.length; i++){
        toutesLesDivs[alienInvaders[i]].classList.remove('alien')
    }
    for (let i = 0; i < alienInvaders.length; i++){
        alienInvaders[i] += direction
    }
    for (let i = 0; i <alienInvaders.length; i++) {
        toutesLesDivs[alienInvaders[i]].classList.add('alien')
    }

    for(let i = 0; i < toutesLesDivs[tireurPosition].classList.length; i++){
        if(toutesLesDivs[tireurPosition].classList[i] == 'tireur' && toutesLesDivs[tireurPosition].classList[i + 1] == 'alien'){
            clearInterval(mouvement)
            toutesLesDivs[tireurPosition].classList.add('boom')
            toutesLesDivs[tireurPosition].classList.remove('alien')
            affichage.innerHTML = 'Game over'

        }
    }
}

let mouvement = setInterval(mouvementAliens,100)