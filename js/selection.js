// Function to remove chosen cookie and send user back to selection page, needs to be implemented
function remove_selection() {
    Cookies.remove('chosen');
    assign_window();
}
// Function that sends user back to selection screen.
function assign_window() {
    window.location.assign('../index.html')
}
// Function that uses a potion to restore health
function use_potion() {
    // Add ten to users current health
    user_current_health += 10;
    // Add a check to make sure the potion does not exceed users max health
    if (user_current_health >= game_state.userMaxHealth) {
        user_current_health = game_state.userMaxHealth;
        user_health.innerText = `Health: ${game_state.userMaxHealth} / ${game_state.userMaxHealth}`
    } else {
        // Display's the new current health after using potion
        user_health.innerText = `Health: ${user_current_health} / ${game_state.userMaxHealth}`
    }
    // Send it to enemies turn on a 2 second timeout
    winner_message.innerText = `It's the enemies turn!`
    setTimeout(function () {
        enemy_attack(list_of_pokemon_selection)
    }, 2000)
}

// Function that deals with the player attack
function player_attack(num) {
    // Take the enemy current health and minus the dmg number being passed in as an argument
    enemy_current_health -= num;
    // Displaying enemies new health
    enemy_health.innerText = `Health: ${enemy_current_health} / ${list_of_pokemon_selection.maxhealth}`;
    // Checking to see if enemies health is 0 or below, if it is display winning message and send back to selection page to play again
    if (enemy_current_health <= 0) {
        winner_message.innerText = "Congrats You have won!"
        setTimeout(assign_window, 3000);
    } else {
        // If enemy still has health, it sends the enemy attack message and calls the enemy attack function on a 2 second timeout
        winner_message.innerText = "Enemy's Turn to attack!"
        setTimeout(function () {
            enemy_attack(list_of_pokemon_selection)
        }, 2000)
        // Add in some styling so attack button cannot be spammed, and no pointer events show up on enemy turn
        document.getElementById('attack_container').style.pointerEvents = 'none';
        document.getElementById('attack_container').style.userSelect = 'none';
    }
    // Set game state cookies on every player attack
    game_state.computerCurrentHealth = enemy_current_health;
    Cookies.set('game_status', JSON.stringify(game_state));

}

// Function that handles the enemy attacks
function enemy_attack(object) {
    // Doing math to get a random number.
    enemy_attack_num = Math.random() * (4 - 1) + 1;
    // Depending on number depends on what attack enemy will use and minus from player health
    if (enemy_attack_num >= 3) {
        user_current_health -= object.attacks[2].damage;
    } else if (enemy_attack_num >= 2) {
        user_current_health -= object.attacks[1].damage;
    } else {
        user_current_health -= object.attacks[0].damage;
    }
    // Update player health
    user_health.innerText = `Health: ${user_current_health} / ${game_state.userMaxHealth}`
    // Check to see if player health is 0 or less, if it is defeated message shows up and sends to selection page
    if (user_current_health <= 0) {
        winner_message.innerText = "Sorry you have been defeated!"
        setTimeout(assign_window, 3000);
    } else {
        // If player still has health it sends the player turn to attack message
        winner_message.innerText = "It is now your turn to attack!"
    }
    // Update users current health and set it to a cookie
    game_state.userCurrentHealth = user_current_health;
    Cookies.set('game_status', JSON.stringify(game_state));
    // same as above, here so user cannot spam attacks
    document.getElementById('attack_container').style.pointerEvents = 'auto';
    document.getElementById('attack_container').style.pointerEvents = 'auto';
}

// Function to show enemy card on page We create the variables needed and set inner text to the pokemon objects values then append them all to the page
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

// Function that shows the users selected pokemon on the page
function selection_card(user_selection) {
    // check to see if its a valid pokemon, if it is not it sends an error message on screen
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
        // Creating attack section container and appending to parent
        var attack_container = document.createElement('section');
        attack_container.id = 'attack_container';
        chosen_selection.appendChild(attack_container);
        // Looping through to show attack buttons on the page
        for (var i = 0; i < user_selection.attacks.length; i++) {
            var attack = document.createElement('button');
            attack.innerText = `${user_selection.attacks[i].name} Damage Attack`;
            attack.setAttribute('onclick', `player_attack(${user_selection.attacks[i].damage})`);
            attack_container.appendChild(attack);
        }

        // Showing the potion button on the page
        var potion = document.createElement('button');
        potion.innerText = `Use Potion!`;
        potion.setAttribute('onclick', `use_potion()`);
        attack_container.appendChild(potion);

    }
}
// Setting up and creating a page container and winner message and appeninding message to parent
var page_container = document.getElementById('page_container');
var winner_message = document.createElement('h1');
page_container.appendChild(winner_message);

// Getting our cookies
var game_state = JSON.parse(Cookies.get('game_status'));
var user_selection = JSON.parse(Cookies.get('chosen'));
// Setting variables based on object values from cookes
var list_of_pokemon_selection = game_state.computerPokemonSelection;
var user_current_health = game_state.userMaxHealth;
var enemy_current_health = game_state.computerCurrentHealth;
// Creating some p tags for health
var enemy_health = document.createElement('p');
var user_health = document.createElement('p');

var chosen_selection = document.getElementById('chosen_selection');
// Calling our functions
selection_card(user_selection);
enemy_selection(list_of_pokemon_selection);
