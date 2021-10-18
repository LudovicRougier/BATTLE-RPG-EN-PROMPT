/*  
 Fonctions 
*/

// La fonction askName demande au client de donner son pseudo
function askPlayer1(message){
    return prompt(message);
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
fonction générant un nombre aléatoire dépendant de la strength du joueur

@param int strength

@return int
*/
function hitEnemy(strength, ennemyAction, playerPreviousAction, ennemyHp){
    var damage = Math.round(
        (Math.random()* (strength/3)) +1
    );

    if (ennemyAction === ACTION_DEFEND){
        damage = damage - parryValue;
        if( damage < parryValue ){
            damage = 0;
        }
    }
    if (playerPreviousAction === ACTION_PREPARE ){
        damage += 3;
    }

    var newEnnemyHP = ennemyHp - damage;

    return [damage, newEnnemyHP];
}

/*
fonction générant un nombre aléatoire dépendant de la strength du joueur

@param int strength

@return int
*/
function parry(strength){
    return Math.round(
        (Math.random()* (strength/3))
    );
}

//Fonction de génération de personnage

function generatingPlayer(name, strength){
    var character = [];

    hp = generatingRandomValue( strength + 10, strength + 20 );

    character['name'] = name;
    character['action'] = null;
    character['previous_action'] = null;
    character['strength'] = strength;
    character['hp'] = hp;

    return character;
}

function computerDecision(previousAction){

    if (previousAction !== ACTION_ATTACK ){

        return ACTION_ATTACK;
    } 

    return generatingRandomValue(1, 3);
}


function playRpgGame(){
    var player1 = [];
    var computer = [];
    var turn = null;
    var damage = null;
    var nickname;
    var strength;
    var hp;

    const ACTION_ATTACK = 1;
    const ACTION_DEFEND = 2;
    const ACTION_PREPARE = 3;
    const ACTION_RUN = 4;

    nickname = askPlayer1('Quel est votre nom ?');
    strength = parseInt(askPlayer1('Quelle est votre force'), 10);
    
/*     player1['name'] = askPlayer1( 'Quel est votre nom ?');
    player1['action'] = null;
    player1['previous_action'] = null;
    player1['strength'] = parseInt(askPlayer1('Quelle est votre force'), 10);
    player1['hp'] = generatingRandomValue( player1['strength'] + 10, player1['strength'] + 20 ); */
    player1 = generatingPlayer(nickname, strength);

/*     computer['name'] = 'Ennemi';
    computer['action'] = null;
    computer['previous_action'] = null;
    computer['strength'] = generatingRandomValue( player1['strength'], player1['strength'] + 5 );
    computer['hp'] = generatingRandomValue( player1['strength'] + 10, player1['strength'] + 20 ); */
    computer = generatingPlayer('Ennemi', strength);


    turn = generatingRandomValue(1, 2);

    while( computer['hp'] > 0 && player1['hp'] > 0 ) {
        while(turn === 1 && (player1['action'] !== ACTION_ATTACK || player1['action'] !== ACTION_DEFEND || player1['action'] !== ACTION_PREPARE || player1['action'] !== ACTION_RUN)){
            
            player1['action'] = parseInt(prompt('Que voulez vous faire ? \n 1. Attaquer \n 2. Bloquer \n 3. Se préparer \n 4. Fuir'), 10);
            

            if (player1['action'] === ACTION_ATTACK){


                 var results = hitEnemy(player1['strength'], computer['action'], player1['previous_action'], computer['hp']); 

                damage = results[0];
                computer['hp'] = results[1];

                alert('Vous avez fait ' + damage + ' points de dégats');
            }
            else if (player1['action'] === ACTION_DEFEND){
                parryValue = parry(player1['strength']);
                alert ('Vous réduirez les dégats de ' + parryValue + ' si vous êtes attaqués ce tour');
            }
            else if (player1['action'] === ACTION_PREPARE){
                alert ('Si vous attaquez au prochain tour, vous infligerez 3 points de dégats supplémentaire');
            }
            else if (player1['action'] === ACTION_RUN){
                alert('Vous avez fuit \n rechargez la page pour recommencer');
                return 0;
            }
            else if (player1['hp'] <= 0){
                alert('Vous avez perdu \n rechargez la page pour recommencer');  
                return 0;
            }
            else {
                alert('La réponse doit être 1 ou 2 ou 3 ou 4');
            }
            turn =2;
            player1['previous_action'] = player1['action'];
        }

        alert(player1['name'] + ' a ' + player1['hp'] + ' points de vie\n l\'' + computer['name'] + ' a ' + computer['hp'] + ' points de vie' );

        /* * IA de l'adversaire afin qu'il attaque plus souvent au lieu de ne rien faire
        if (computer.previous_action === ACTION_PREPARE ){

            computer.action = ACTION_ATTACK;
        } 
        else if (computer.previous_action === ACTION_DEFEND ) {

            computer.action = ACTION_ATTACK;
        }
        else {
            computer.action = generatingRandomValue(1, 3);
        } */

        computer.action = computerDecision(computer.previous_action);

        if (computer['action'] === ACTION_ATTACK && computer['hp'] > 0){
            var results = hitEnemy(computer['strength'], player1['action'], computer['previous_action'], player1['hp']);
        
            damage = results[0];
            player1['hp'] = results[1];
            alert('Vous avez subit ' + damage + ' points de dégats');
        }
        else if (computer['action'] === ACTION_DEFEND  && computer['hp'] > 0){
            parryValue = parry(computer['strength']);
            alert ('l\''+ computer['name'] + ' réduira les dégats de ' + parryValue + ' si vous attaquez ce tour');
        }
        else if (computer['action'] === ACTION_PREPARE  && computer['hp'] > 0){
            alert ('Si vous vous faites attaquer au prochain tour, vous subirez 3 points de dégats supplémentaires');
        }
        else if (computer['hp'] <= 0){
            alert('Vous avez gagné \n rechargez la page pour recommencer');
            return 0;
        }
        else {
            alert('La réponse doit être 1 ou 2 ou 3 ou 4');
        }
        
        turn =1;
        computer['previous_action'] = computer['action'];

        alert(player1['name'] + ' a ' + player1['hp'] + ' points de vie\n l\'' + computer['name'] + ' a ' + computer['hp'] + ' points de vie' );
    }
}
var parryValue = 0;

const ACTION_ATTACK = 1;
const ACTION_DEFEND = 2;
const ACTION_PREPARE = 3;
const ACTION_RUN = 4;


playRpgGame();