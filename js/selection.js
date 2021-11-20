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

}
function player_attack(num) {

    enemy_current_health -= num;
    enemy_health.innerText = `Health: ${enemy_current_health} / ${enemy_pokemon_selection.maxhealth}`
    if (enemy_current_health <= 0) {
        winner_message.innerText = "Congrats You have won!"
        setTimeout(assign_window, 3000);
    } else {
        winner_message.innerText = "Enemy's Turn to attack!"
        setTimeout(function () {
            enemy_attack(enemy_pokemon_selection)
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
        user_current_health -= object.attack3;
    } else if (enemy_attack_num >= 2) {
        user_current_health -= object.attack2;
    } else {
        user_current_health -= object.attack1;
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
    var selected = chosen_one[user_selection];
    if (selected === undefined) {
        document.body.innerHTML = "<h1>Please Choose a valid pokemon!</h1>";
    } else {
        // Displaying Chosen message
        chosen_selection.innerText = `You have picked ${selected.name} Nice!`;
        // setting up our health variables

        user_health.innerText = `Health: ${user_current_health} / ${selected.maxhealth}`
        chosen_selection.appendChild(user_health);
        // Creating and displaying the chosen image
        var pokemon_selected = document.createElement('img');
        pokemon_selected.setAttribute('src', selected.img_src);
        // Appending image to parent

        chosen_selection.appendChild(pokemon_selected);
        var attack_container = document.createElement('section')
        attack_container.id = 'attack_container';
        chosen_selection.appendChild(attack_container);

        var attack1 = document.createElement('button');
        attack1.innerText = `${selected.attack1} Damage Attack`;
        attack1.setAttribute('onclick', `player_attack(${selected.attack1})`);
        attack_container.appendChild(attack1);

        var attack2 = document.createElement('button');
        attack2.innerText = `${selected.attack2} Damage Attack`;
        attack2.setAttribute('onclick', `player_attack(${selected.attack2})`);
        attack_container.appendChild(attack2);

        var attack3 = document.createElement('button');
        attack3.innerText = `${selected.attack3} Damage Attack`;
        attack3.setAttribute('onclick', `player_attack(${selected.attack3})`);
        attack_container.appendChild(attack3);

        var potion = document.createElement('button');
        potion.innerText = `Use Potion!`;
        potion.setAttribute('onclick', `use_potion()`);
        attack_container.appendChild(potion);

    }
}

var enemy_pokemon = {

    squirtle: {
        name: 'Squirtle',
        img_src: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc2MjY3Mzg3MDczNDcxNjc4/pokemon-squirtle-nicknames.jpg",
        maxhealth: 40,
        attack1: 9,
        attack2: 11,
        attack3: 13

    },
    pikachu: {
        name: 'Pikachu',
        img_src: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc2MjY3Mzg3MDczNDcxNjc4/pokemon-squirtle-nicknames.jpg",
        maxhealth: 50,
        attack1: 5,
        attack2: 7,
        attack3: 9

    },
    charmander: {
        name: 'Charmander',
        img_src: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc2MjY3Mzg3MDczNDcxNjc4/pokemon-squirtle-nicknames.jpg",
        maxhealth: 70,
        attack1: 15,
        attack2: 20,
        attack3: 25

    }

};
var page_container = document.getElementById('page_container');
var winner_message = document.createElement('h1');
page_container.appendChild(winner_message);

// Setting up an array of objects to use based on selection
var chosen_one = {

    squirtle: {
        name: 'squirtle',
        img_src: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc2MjY3Mzg3MDczNDcxNjc4/pokemon-squirtle-nicknames.jpg",
        maxhealth: 40,
        attack1: 5,
        attack2: 7,
        attack3: 9

    },
    charmander: {
        name: 'charmander',
        img_src: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/d/d4/Charmander.gif",
        maxhealth: 40,
        attack1: 5,
        attack2: 7,
        attack3: 9
    },
    bulbasaur: {
        name: 'bulbasaur',
        img_src: "https://64.media.tumblr.com/172a6e167359e6b6832116ffac691e87/tumblr_inline_p7ja2uo4ZQ1qhvvv4_500.png",
        maxhealth: 40,
        attack1: 5,
        attack2: 7,
        attack3: 9
    },
    pikachu: {
        name: 'pikachu',
        img_src: "https://secure.img1-fg.wfcdn.com/im/77981853/resize-h755-w755%5Ecompr-r85/8470/84707680/Pokemon+Pikachu+Wall+Decal.jpg",
        maxhealth: 40,
        attack1: 5,
        attack2: 7,
        attack3: 9
    }
};

var game_state = JSON.parse(Cookies.get('game_status'));
var user_selection = Cookies.get('chosen');
var enemy_pokemon_selection = game_state.computerPokemonSelection;
var user_current_health = game_state.userCurrentHealth;
var enemy_current_health = game_state.computerCurrentHealth;
var enemy_health = document.createElement('p');
var user_health = document.createElement('p');
var chosen_selection = document.getElementById('chosen_selection');
selection_card(user_selection);
enemy_selection(enemy_pokemon_selection);
