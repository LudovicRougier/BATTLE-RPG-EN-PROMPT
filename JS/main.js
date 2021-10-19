function Character(name, weapon) {
	this.actions = [];
	
	this.name = name;
	this.parryValue = 0;
	
	if (weapon instanceof Weapon) {
		this.weapon = weapon;
		this.currentHp = this.weapon.getHp();
		this.maxHp = this.currentHp;
		this.strength = this.weapon.getStrength();
	}
}

Character.prototype.getHp = function () {
	return this.currentHp;
}

Character.prototype.getName = function () {
	return this.name;
}

Character.prototype.addAction = function (action) {
	this.actions.push(action);
}

Character.prototype.getLastAction = function () {
	if (this.actions.length == 0) {
		return null;
	}
	
	return this.actions[this.actions.length - 1];
}

Character.prototype.attack = function (enemy) {
	
	var strength = this.strength + this.weapon.getStrength();
	
    var damage = Math.round(
        (Math.random()* (strength/3)) +1
    );
	
	var damageMultiplier = this.weapon.getDamageMultiplier()
	
	if (damageMultiplier != 0) {
	  damage = Math.round(damage * damageMultiplier);
	}	
	
	if (enemy.getLastAction() == ACTION_DEFEND) {
		var parryValue = enemy.getParryValue();
        damage = damage - parryValue;
        if( damage < parryValue ){
            damage = 0;
        }
	}


    if (this.getLastAction() === ACTION_PREPARE && this.weapon.getBonusDamage()){
        damage += this.weapon.getBonusDamage();
    }
    else{
        damage += 3;
    }
	
	enemy.takeDamage(damage);
	
	return damage;
}

Character.prototype.prepareParry = function () {
	
    if (this.weapon === WEAPON_SWORD_AND_SHIELD){
        this.parryValue = Math.round(
            (Math.random()* (this.weapon.strength) + 5) 
        );
		
		return this.parryValue;
    }
	
    this.parryValue = Math.round(
        (Math.random()* (strength/3))
    );
	
	return this.parryValue;
}

Character.prototype.takeDamage = function (damage) {
	this.currentHp = this.currentHp - damage;
}

Character.prototype.getParryValue = function () {
	var parryValue = this.parryValue;
	
	this.parryValue = 0;
	
	return parryValue;
}

Character.prototype.chooseActionAlone = function () {
    if (this.getLastAction() !== ACTION_ATTACK ){
        this.addAction(ACTION_ATTACK);
    } 

    this.addAction(generatingRandomValue(1, 3));
}

function Weapon(id, name, strength, hp, damageMultiplier = 0, bonusDamage = 0, parryValue = 0) {
	this.id = id;
	this.name = name;
	this.strength = strength;
	this.hp = hp;
	this.damageMultiplier = damageMultiplier;
	this.bonusDamage = bonusDamage;
	this.parryValue = parryValue;
}

Weapon.prototype.getId = function () {
	return this.id;
}

Weapon.prototype.getStrength = function () {
	return this.strength;
}

Weapon.prototype.getDamageMultiplier = function () {
	return this.damageMultiplier;
}

Weapon.prototype.getBonusDamage = function () {
	return this.bonusDamage;
}

Weapon.prototype.getHp = function () {
	return this.hp;
}

const WEAPON_SWORD_AND_SHIELD = new Weapon(1, 'Sword and shield', 15, generatingRandomValue(35, 55));
const WEAPON_AXE = new Weapon(2, 'Axe', 20, generatingRandomValue(30, 40));
const WEAPON_DAGGERS = new Weapon(3, 'Daggers', 12.5, generatingRandomValue(17.5, 22.5), 2, 6);
const WEAPON_STAFF = new Weapon(4, 'Staff', 9, generatingRandomValue(12, 15), 1.5, 3);



//Fonction de génération de personnage

function generatingPlayer(name, weaponId){
	
	var weapon = null;
	
	switch (weaponId) {
		case WEAPON_SWORD_AND_SHIELD.getId():
		weapon = WEAPON_SWORD_AND_SHIELD;
		break;
		
		case WEAPON_AXE.getId():
		weapon = WEAPON_AXE;
		break;
		
		case WEAPON_DAGGERS.getId():
		weapon = WEAPON_DAGGERS;
		break;
		
		case WEAPON_STAFF.getId():
		weapon = WEAPON_STAFF;
		break;
	}
	
    return new Character(name, weapon);
}

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

function isValidAction(action) {
	return action > 0 & action < 5;
}

function isGameFinish(player, computer) {
	return computer.getHp() <= 0 || player.getHp() <= 0;
}


function playRpgGame(){
    var turn = generatingRandomValue(1, 2);

    var nickname = askPlayer1('Quel est votre nom ?');
    var weapon = parseInt(askPlayer1('Quelle arme voulez vous utiliser ? \n 1. Epée \n 2. Hache \n 3. Dagues \n 4. Bâton'), 10);
    
    var player1 = generatingPlayer(nickname, weapon);
    var computer = generatingPlayer('Ennemi', weapon);
	
	console.log(player1);
	console.log(computer);
	console.log(turn);

    while(!isGameFinish(player1, computer)) {
		var currentCharacter = null;
		var otherCharacter = null;
		
		if (turn == 1) {
			var newAction = parseInt(prompt('Que voulez vous faire ? \n 1. Attaquer \n 2. Bloquer \n 3. Se préparer \n 4. Fuir'), 10);
			player1.addAction(newAction);
			currentCharacter = player1;
			otherCharacter = computer;
		}
		else {
			computer.chooseActionAlone();
			currentCharacter = computer;
			otherCharacter = player1;
		}
		
		console.log(currentCharacter);
		console.log(otherCharacter);

		if (currentCharacter.getLastAction() === ACTION_ATTACK){
			var damage = currentCharacter.attack(otherCharacter);
			alert(currentCharacter.getName() + ' a fait ' + damage + ' points de dégats');
		}
		else if (currentCharacter.getLastAction() === ACTION_DEFEND){
			var parryValue = currentCharacter.prepareParry();
			alert (currentCharacter.getName() + ' se défend, il réduira les dégats de ' + parryValue + ' s\'il est attaqué durant ce tour');
		}
		else if (currentCharacter.getLastAction() === ACTION_PREPARE){
			alert (currentCharacter.getName() + ' se prépare, vous infligerez 3 points de dégats supplémentaire si vous attaquez au prochain tour');
		}
		else if (currentCharacter.getLastAction() === ACTION_RUN){
			alert(currentCharacter.getName() + ' a fui \n rechargez la page pour recommencer');
			return 0;
		}
		else {
			alert('La réponse doit être 1 ou 2 ou 3 ou 4, vous avez perdu un tour');
		}
		
        alert(player1.getName() + ' a ' + player1.getHp() + ' points de vie\n l\'' + computer.getName() + ' a ' + computer.getHp() + ' points de vie' );
		
		if (turn == 1) {
			turn = 2;
		}
		else {
			turn = 1;
		}
    }
	
    if( player1.getHp() <= 0) {
        alert(player1.getName() + ' a perdu \n rechargez la page pour recommencer'); 
    }
	else {
        alert(computer.getName() + ' a perdu \n rechargez la page pour recommencer'); 
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