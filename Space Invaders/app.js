
let grille1 = document.createElement("table")
grille1.setAttribute('id','tab')

function ajouterEnnemies(){
    let ligne = $('#tab').find('tr')
    for (let i = 4; i <= 15 ; i++){
        ligne[0].children[i].setAttribute('class','alien')
        ligne[1].children[i].setAttribute('class','alien')
    }
}

function mouvementEnnemies(){
    let ligne = $('#tab').find('tr')
    for (let j = 0; j < ligne.length ; j++){
        let colonne = ligne[j].children
        console.log(ligne[j])
        for (let i = 0; i < colonne.length; i++){
            if (colonne[i].className == 'alien'){
                if (colonne[i + 1].className != 'alien'){
                    colonne[i+1].classList.add('alien')
                    break
                }
                colonne[i+1].classList.add('alien')

                console.log(colonne[i])
            }
        }
    }


    // for (let i = 0 ; i < ligne.length ; i++){
    //     console.log(ligne[i])
    //     if (ligne[i].children.length != 0){
    //         for (let j = 0; j < ligne[i].children.length; j++ ){
    //             ligne[i + 1].append(ligne[i].children[j])
                
    //         }
    //         break
    //     }
    // }
}
function creationGrille(){
    for (let i = 0; i< 20 ; i++){

        let ligne = document.createElement('tr')
        ligne.setAttribute('id','ligne')
        grille1.appendChild(ligne)
    
    }
    var ligne = $('#tab').find('tr')
    for (let j = 0; j < ligne.length; j++){
        for (let i = 0; i < 20; i++ ){
            let colonne = document.createElement('td')
            colonne.setAttribute('style',' width : 50px;')
            ligne[j].append(colonne)
        }
    }
    
}

// grille1.childNodes.forEach(element => {
//     for(let i = 0 ; i < 12 ; i++){

//         let colonne = document.createElement('td')
//         /*colonne.setAttribute('class','alien')*/
//         colonne.setAttribute('style','background-color : red; width : 50px; border-width : 5px; border-color : red; background-repeat : no-repeat;')
//         element.appendChild(colonne)
        

//     }
// });


let grilleJeu = $('.grille')

grilleJeu.append(grille1)

creationGrille()
setInterval(ajouterEnnemies(), 10000)
setInterval(mouvementEnnemies, 10000)
// mouvementEnnemies()

