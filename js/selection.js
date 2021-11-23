// Here we write the function that attaches to our button that removes the cookies and sends user back to selection page
function remove_selection() {
    Cookies.remove('chosen');
}
function assign_window() {
    window.location.assign('../index.html')
}

function use_potion() {
    user_current_health += 10;
    if (user_current_health >= 40) {
        user_current_health = 40;
        user_health.innerText = `Health: ${game_state.userMaxHealth} / ${game_state.userMaxHealth}`
    } else {
        user_health.innerText = `Health: ${user_current_health} / ${game_state.userMaxHealth}`
    }
    winner_message.innerText = `It's the enemies turn!`
    setTimeout(function () {
        enemy_attack(list_of_pokemon_selection)
    }, 2000)
}
function player_attack(num) {

    enemy_current_health -= num;
    enemy_health.innerText = `Health: ${enemy_current_health} / ${list_of_pokemon_selection.maxhealth}`
    if (enemy_current_health <= 0) {
        winner_message.innerText = "Congrats You have won!"
        setTimeout(assign_window, 3000);
    } else {
        winner_message.innerText = "Enemy's Turn to attack!"
        setTimeout(function () {
            enemy_attack(list_of_pokemon_selection)
        }, 2000)
        document.getElementById('attack_container').style.pointerEvents = 'none';
        document.getElementById('attack_container').style.userSelect = 'none';
    }
    game_state.computerCurrentHealth = enemy_current_health;
    Cookies.set('game_status', JSON.stringify(game_state));

}
function enemy_attack(object) {
    enemy_attack_num = Math.random() * (4 - 1) + 1;
    if (enemy_attack_num >= 3) {
        user_current_health -= object.attacks[2].damage;
    } else if (enemy_attack_num >= 2) {
        user_current_health -= object.attacks[1].damage;
    } else {
        user_current_health -= object.attacks[0].damage;
    }

    user_health.innerText = `Health: ${user_current_health} / ${game_state.userMaxHealth}`
    if (user_current_health <= 0) {
        winner_message.innerText = "Sorry you have been defeated!"
        setTimeout(assign_window, 3000);
    } else {
        winner_message.innerText = "It is now your turn to attack!"
    }
    game_state.userCurrentHealth = user_current_health;
    Cookies.set('game_status', JSON.stringify(game_state));
    document.getElementById('attack_container').style.pointerEvents = 'auto';
    document.getElementById('attack_container').style.pointerEvents = 'auto';
}
function enemy_selection(object) {
    var enemy_section = document.createElement('section')
    var enemy_name = document.createElement('h1');
    var enemy_image = document.createElement('img');
    enemy_section.setAttribute('id', 'enemy_container')

    enemy_name.innerText = object.name;
    var enemy_max_health = object.maxhealth;
    enemy_health.innerText = `Health: ${enemy_max_health} / ${enemy_max_health}`;
    enemy_image.setAttribute('src', object.img_src);

    enemy_section.appendChild(enemy_name);
    enemy_section.appendChild(enemy_health);
    enemy_section.appendChild(enemy_image);
    page_container.appendChild(enemy_section);
}


function selection_card(user_selection) {
    if (user_selection === undefined) {
        document.body.innerHTML = "<h1>Please Choose a valid pokemon!</h1>";
    } else {
        // Displaying Chosen message
        chosen_selection.innerText = `You have picked ${user_selection.name} Nice!`;
        // setting up our health variables

        user_health.innerText = `Health: ${user_selection.maxhealth} / ${user_selection.maxhealth}`
        chosen_selection.appendChild(user_health);
        // Creating and displaying the chosen image
        var pokemon_selected = document.createElement('img');
        pokemon_selected.setAttribute('src', user_selection.img_src);
        // Appending image to parent

        chosen_selection.appendChild(pokemon_selected);
        var attack_container = document.createElement('section')
        attack_container.id = 'attack_container';
        chosen_selection.appendChild(attack_container);

        for (var i = 0; i < user_selection.attacks.length; i++) {
            var attack = document.createElement('button');
            attack.innerText = `${user_selection.attacks[i].name} Damage Attack`;
            attack.setAttribute('onclick', `player_attack(${user_selection.attacks[i].damage})`);
            attack_container.appendChild(attack);
        }


        var potion = document.createElement('button');
        potion.innerText = `Use Potion!`;
        potion.setAttribute('onclick', `use_potion()`);
        attack_container.appendChild(potion);

    }
}

var page_container = document.getElementById('page_container');
var winner_message = document.createElement('h1');
page_container.appendChild(winner_message);


var game_state = JSON.parse(Cookies.get('game_status'));
var user_selection = JSON.parse(Cookies.get('chosen'));
var list_of_pokemon_selection = game_state.computerPokemonSelection;
var user_current_health = game_state.userMaxHealth;
var enemy_current_health = game_state.computerCurrentHealth;
var enemy_health = document.createElement('p');
var user_health = document.createElement('p');
var chosen_selection = document.getElementById('chosen_selection');
selection_card(user_selection);
enemy_selection(list_of_pokemon_selection);
