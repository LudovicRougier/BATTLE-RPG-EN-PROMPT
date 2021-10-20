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
function hitEnemy(strength, ennemyAction, playerPreviousAction, ennemyHp, weapon){
    var damage = Math.round(
        (Math.random()* (strength/3)) +1
    );
    if (weapon === DAGGERS){
        damage *= 2;
    }
    if (weapon === STAFF) {
        damage = Math.round(damage*1.5);
        parryValue = 0;
    }

    if (ennemyAction === ACTION_DEFEND){
        damage = damage - parryValue;
        if( damage < parryValue ){
            damage = 0;
        }
    }
    if (playerPreviousAction === ACTION_PREPARE && weapon === STAFF ){
        damage += 6;
    }
    else{
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
function parry(strength, weapon){
    if (weapon === SWORD_AND_SHEILD){
        return Math.round(
            (Math.random()* (strength) + 5) 
        );
    }
    return Math.round(
        (Math.random()* (strength/3))
    );
}

//Fonction de génération de personnage

function generatingPlayer(name, weapon){
    var character = {};
    var characteristic = null;

// Determination des dégats et des pv en fonction de l'arme choisie
    if (weapon === SWORD_AND_SHEILD){
        characteristic = 15;
        hp = generatingRandomValue( characteristic + 20, characteristic + 40 );
    }
    else if (weapon === AXE) {
        characteristic = 20;
        hp = generatingRandomValue( characteristic + 10, characteristic + 20 );
    }
    else if (weapon === DAGGERS) {
        characteristic = 12.5;
        hp = generatingRandomValue( characteristic+ 5, characteristic + 10 );

    }
    else if (weapon === STAFF) {
        characteristic = 9;
        hp = generatingRandomValue( characteristic + 3, characteristic + 6 );
    }

// Création du personnage
    character.name = name;
    character.action = null;
    character.previous_action = null;
    character.weapon = weapon;
    character.strength = characteristic;
    character.hp = hp;

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
    var weapon;
    var hp;

/*     const ACTION_ATTACK = 1;
    const ACTION_DEFEND = 2;
    const ACTION_PREPARE = 3;
    const ACTION_RUN = 4;
 */

    nickname = askPlayer1('Quel est votre nom ?');
    weapon = parseInt(askPlayer1('Quelle arme voulez vous utiliser ? \n 1. Epée \n 2. Hache \n 3. Dagues \n 4. Bâton'), 10);
    
    player1 = generatingPlayer(nickname, weapon);

    computer = generatingPlayer('Ennemi', weapon);


    turn = generatingRandomValue(1, 2);

    while( computer['hp'] > 0 && player1['hp'] > 0 ) {
        while(turn === 1 && (player1['action'] !== ACTION_ATTACK || player1['action'] !== ACTION_DEFEND || player1['action'] !== ACTION_PREPARE || player1['action'] !== ACTION_RUN)){
            
            player1['action'] = parseInt(prompt('Que voulez vous faire ? \n 1. Attaquer \n 2. Bloquer \n 3. Se préparer \n 4. Fuir'), 10);
            

            if (player1['action'] === ACTION_ATTACK){


                 var results = hitEnemy(player1.strength, computer['action'], player1['previous_action'], computer['hp'], player1.weapon); 

                damage = results[0];
                computer['hp'] = results[1];

                alert('Vous avez fait ' + damage + ' points de dégats');
            }
            else if (player1['action'] === ACTION_DEFEND){
                parryValue = parry(player1.strength, player1.weapon);
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
                alert('La réponse doit être 1 ou 2 ou 3 ou 4, vous avez perdu un tour');
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
            var results = hitEnemy(computer.strength, player1['action'], computer['previous_action'], player1['hp'], computer.weapon);
        
            damage = results[0];
            player1['hp'] = results[1];
            alert('Vous avez subit ' + damage + ' points de dégats');
        }
        else if (computer['action'] === ACTION_DEFEND  && computer['hp'] > 0){
            parryValue = parry(computer.strength, computer.weapon);
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
    if( player1.hp <= 0) {
        alert('Vous avez perdu \n rechargez la page pour recommencer'); 
    }
}
var parryValue = 0;

const ACTION_ATTACK = 1;
const ACTION_DEFEND = 2;
const ACTION_PREPARE = 3;
const ACTION_RUN = 4;

const SWORD_AND_SHEILD = 1;
const AXE = 2;
const DAGGERS = 3;
const STAFF = 4;


playRpgGame();