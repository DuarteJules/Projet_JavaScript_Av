
const container = document.querySelector('.grille');
const affichage = document.querySelector('h3');
let resultats = 0;
let toutesLesDivs;
let alienInvaders = [];
let tireurPosition = 229;
let direction = 1;
let width = 20;
let fin = false
let score = 0
let cadenceTir = 1

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
            fin = true
        }
    }
    finDeJeu()
}

let mouvement = setInterval(mouvementAliens,500)

function laser(){
    let tir = tireurPosition
    let laser = setInterval(() => {
        if(tir>19){
            tir -= 20 
            toutesLesDivs[tir].classList.add('laser')
            toutesLesDivs[tir + 20].classList.remove('laser')
        }
        else{
            toutesLesDivs[tir].classList.remove('laser')
            clearInterval(laser)
        }

        for (let i = 0; i < alienInvaders.length; i++){
            if(toutesLesDivs[alienInvaders[i]].classList.contains('alien') && toutesLesDivs[alienInvaders[i]].classList.contains('laser')){
                toutesLesDivs[alienInvaders[i]].classList.remove('alien')
                toutesLesDivs[tir].classList.remove('laser')
                toutesLesDivs[alienInvaders[i]].classList.add('boom')
                score++
                affichage.innerHTML = 'Score : ' + score
                setTimeout(() => {
                    toutesLesDivs[alienInvaders[i]].classList.remove('boom')
                    alienInvaders.splice(i,1)
                }, 10);
                    clearInterval(laser)
           }
        }
        // toutesLesDivs[tir].classList.add('laser')
        // toutesLesDivs[tir + 20].classList.remove('laser')
    }, 100);



    // let traineTir = tir
    // while(tir > 19){
    //     tir -= 20
    //     toutesLesDivs[tir].classList.add('laser')
    //     setTimeout(()=>{
    //         while(tir <= 19){
    //             toutesLesDivs[traineTir].classList.remove('laser')
    //             if(traineTir > 0){
    //                 traineTir -=20
    //             }
    //         }
    //     },50)
    // }
    // toutesLesDivs[tir].classList.remove('laser')
}

function mouvementTireur(moove){

    toutesLesDivs[tireurPosition].classList.remove('tireur')
    // switch(moove.key){

    //     case 'ArrowLeft':
    //         if(tireurPosition % width !==0)
    //         tireurPosition -=1
    //         console.log(moove.key)
    //         break
    //     case 'ArrowRight':
    //         if(tireurPosition % width <width -1)
    //         tireurPosition +=1
    //         break

    //     case 'ArrowUp':
    //         if(tireurPosition >200 && tireurPosition<240)
    //         tireurPosition -=20
    //         break
    //     case 'ArrowDown':
    //         if(tireurPosition >179 && tireurPosition<220)
    //         tireurPosition +=20
    //         break
    // }
    console.log(moove.key )
    if(moove.key == 'ArrowLeft' && tireurPosition % width !==0 && fin == false){
        tireurPosition -=1
    }
    else if (moove.key == 'ArrowRight'&& tireurPosition % width <width -1 && fin == false){
        tireurPosition +=1
    }
    else if (moove.key == 'ArrowUp' && tireurPosition >199 && tireurPosition<240 && fin == false){
        tireurPosition -=20
    }
    else if (moove.key == 'ArrowDown' && tireurPosition >179 && tireurPosition<220 && fin == false){
        tireurPosition +=20
    }
    else if (moove.key == 'x' && fin == false && cadenceTir == 1){
        cadenceTir = 0
        laser()
        setTimeout(() => {
            cadenceTir = 1
        }, 1000);
    }
    toutesLesDivs[tireurPosition].classList.add('tireur')
}

function finDeJeu(){
    if (alienInvaders.length == 0){
        affichage.innerHTML = "c'est gagné !"
        fin = true
    }
}

document.addEventListener('keydown', mouvementTireur)