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
function hitEnnemy(strength){
    return Math.round(
        (Math.random()* (strength/3)) +1
    );
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

function playRpgGame(){
    var player1 = [];
    var computer = [];
    var turn = null;
    var damage = null;
    var parryValue = 0;

    player1['name'] = askPlayer1( 'Quel est votre nom ?');
    player1['action'] = null;
    player1['previous_action'] = null;
    player1['strength'] = parseInt(askPlayer1('Quelle est votre force'), 10);
    player1['hp'] = generatingRandomValue( player1['strength'] + 10, player1['strength'] + 20 );

    computer['name'] = 'Ennemi';
    computer['action'] = null;
    computer['previous_action'] = null;
    computer['strength'] = generatingRandomValue( player1['strength'], player1['strength'] + 5 );
    computer['hp'] = generatingRandomValue( player1['strength'] + 10, player1['strength'] + 20 );


    turn = generatingRandomValue(1, 2);

    while( computer['hp'] > 0 && player1['hp'] > 0 ) {
        while(turn === 1 && (player1['action'] !== 1 || player1['action'] !== 2 || player1['action'] !== 3 || player1['action'] !== 4)){
            
            alert('C\'est à vous');
            player1['action'] = parseInt(prompt('Que voulez vous faire ? \n 1. Attaquer \n 2. Bloquer \n 3. Se préparer \n 4. Fuir'), 10);
            

            if (player1['action'] === 1){
                damage = hitEnnemy(player1['strength']); 
                
                if (computer['action'] === 2){
                    damage = damage - parryValue;
                    if( damage < parryValue ){
                        damage = 0;
                    }
                }
                if (player1['previous_action'] === 3 ){
                    damage += 3;
                }
                computer['hp'] = computer['hp'] - damage;
                alert('Vous avez fait ' + damage + ' points de dégats');
                console.log(computer['hp']);
            }
            else if (player1['action'] === 2){
                parryValue = parry(player1['strength']);
                alert ('Vous réduirez les dégats de ' + parryValue + ' si vous êtes attaqués ce tour');
            }
            else if (player1['action'] === 3){
                alert ('Si vous attaquez au prochain tour, vous infligerez 3 points de dégats supplémentaire');
            }
            else if (player1['action'] === 4){
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

        computer['action'] = generatingRandomValue(1, 3);

        console.log(computer['action']);

        if (computer['action'] === 1 && computer['hp'] > 0){
            damage = hitEnnemy(computer['strength'] ) 
                
            if (player1['action'] === 2){
                damage = damage - parryValue;
                if( damage < parryValue ){
                    damage = 0;
                }
            }
            player1['hp'] = player1['hp'] - damage;
            alert('Vous avez subit ' + damage + ' points de dégats');
            console.log(player1['hp']);
        }
        else if (computer['action'] === 2  && computer['hp'] > 0){
            parryValue = parry(computer['strength']);
            alert ('l\''+ computer['name'] + ' réduira les dégats de ' + parryValue + ' si vous attaquez ce tour');
        }
        else if (computer['action'] === 3  && computer['hp'] > 0){
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
playRpgGame();