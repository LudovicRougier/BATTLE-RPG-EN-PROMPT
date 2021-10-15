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
    return Math.round(
        (Math.random()* (min - max )) +max
    );
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

function playRpgGame(){
    var player1 = [];
    var computer = [];
    var turn = null;
    var playerAction = null;
    var previousPlayerAction = null;
    var computerAction = null;
    var previousComputerAction = null;
    var damage = null;
    var parryValue = 0;
    var modifiedStrength = 0;

    player1['name'] = askName();
    computer['name'] = 'Ennemi';
    
    var forcePlayer1 = 10;
    var forceComputer = 10;

    player1['hp'] = generatingRandomValue( 15, 20 );
    computer['hp'] = generatingRandomValue( 15, 20 );

    console.log( player1 );
    console.log( computer );

    turn = generatingRandomValue(1, 2);

    while( computer['hp'] > 0 && player1['hp'] > 0 ) {
        while(turn === 1 && (playerAction !== 1 || playerAction !== 2 || playerAction !== 3 || playerAction !== 4)){
            
            alert('C\'est à vous');
            playerAction = parseInt(prompt('Que voulez vous faire ? \n 1. Attaquer \n 2. Bloquer \n 3. Se préparer \n 4. Fuir'), 10);
            previousPlayerAction = playerAction;

            if (playerAction === 1){
                damage = hitEnnemy(forcePlayer1); 
                
                if (computerAction === 2){
                    damage = damage - parryValue;
                    if( damage < parryValue ){
                        damage = 0;
                    }
                }
                if (previousPlayerAction === 3 ){
                    damage += 3;
                }
                computer['hp'] = computer['hp'] - damage;
                alert('Vous avez fait ' + damage + ' points de dégats');
                console.log(computer['hp']);
            }
            else if (playerAction === 2){
                parryValue = parry(forcePlayer1);
                alert ('Vous réduirez les dégats de ' + parryValue + ' si vous êtes attaqués ce tour');
            }
            else if (playerAction === 3){
                alert ('Vous réduirez les dégats de ' + parryValue + ' si vous êtes attaqués ce tour');
            }
            else if (playerAction === 4){
                alert('Vous avez fuit \n rechargez la page pour recommencer');
                return 0;
            }
            else if (player1['hp'] === 0){
                alert('Vous avez perdu \n rechargez la page pour recommencer');  
                return 0;
            }
            else {
                alert('La réponse doit être 1 ou 2 ou 3 ou 4');
            }
            turn =2;
        }

        alert(player1['name'] + ' a ' + player1['hp'] + ' points de vie\n l\'' + computer['name'] + ' a ' + computer['hp'] + ' points de vie' );

        //computerAction = generatingRandomValue(1, 3);
        computerAction = 1;
        previousComputerAction = computerAction;

        console.log(computerAction);

        if (computerAction === 1 && computer['hp'] > 0){
            damage = hitEnnemy(forceComputer ) 
                
            if (playerAction === 2){
                damage = damage - parryValue;
                if( damage < parryValue ){
                    damage = 0;
                }
            }
            player1['hp'] = player1['hp'] - damage;
            alert('Vous avez subit ' + damage + ' points de dégats');
            console.log(player1['hp']);
        }
        else if (computerAction === 2  && computer['hp'] > 0){
            parryValue = parry(forceComputer);
            alert ('l\''+ computer['name'] + ' réduira les dégats de ' + parryValue + ' si vous attaquez ce tour');
        }
        else if (computerAction === 3  && computer['hp'] > 0){
            
        }
        else if (computer['hp'] === 0){
            alert('Vous avez gagné \n rechargez la page pour recommencer');  
            return 0;
        }
        else {
            alert('La réponse doit être 1 ou 2 ou 3 ou 4');
        }
        turn =1;
        
        alert(player1['name'] + ' a ' + player1['hp'] + ' points de vie\n l\'' + computer['name'] + ' a ' + computer['hp'] + ' points de vie' );
    }
}
/* Déclaration des joueurs */
/* var player1 = [askName()];
var computer = ['Ordinateur'];

var forcePlayer1 = 10;
var forceComputer = 10;
 */
playRpgGame();