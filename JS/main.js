/*  
 Fonctions 
*/

// La fonction askName demande au client de donner son pseudo
function askName(){
    return prompt('Quel est votre pseudo ?');
}

/* 
La fonction attends deux paramètres et retourne un nombre aléatoire compris entre ces deux paramètres 

@param int min
@param int max

@return int
*/
function generatingRandomValue(min, max) {

    if(min < max){
        return Math.round(
            (Math.random()* (max - min )) +min
        );
    }
    else {
        return Math.round(
            (Math.random()* (min - max )) +max
        );
    }
}
/*
fonction générant un nombre aléatoire dépendant de la force du joueur

@param int force

@return int
*/
function hitEnnemy(force){
    return Math.round(
        (Math.random()* (force/3)) +1
    );
}

/*
fonction générant un nombre aléatoire dépendant de la force du joueur

@param int force

@return int
*/
function parry(force){
    return Math.round(
        (Math.random()* (force/3))
    );
}

/*
fonction augmentant la force du joueur

@return int
*/
function prepare(){
    return force += 3
}
/*
fonction permettant de quitter le jeu

@return true
*/
function runAway(){
    return true
}

function playRpgGame(){
    var player1 = [askName()];
    var computer = ['Ordinateur'];
    
    var forcePlayer1 = 10;
    var forceComputer = 10;

    player1[1][0] = generatingRandomValue( 15, 20 );
    computer[1][0] = generatingRandomValue( 15, 20 );

    console.log( player1[1][0] );
    console.log( computer[1][0] );
     
}
/* Déclaration des joueurs */
/* var player1 = [askName()];
var computer = ['Ordinateur'];

var forcePlayer1 = 10;
var forceComputer = 10;
 */
playRpgGame();