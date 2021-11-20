// Here we write the function that attaches to our button that removes the cookies and sends user back to selection page
function remove_selection() {
    Cookies.remove('chosen');
}

function enemy_selection(enemy) {
    var enemy_selection = document.createElement('section');
    enemy_selection.setAttribute('id', 'enemy_container');

    var enemy_name = document.createElement('h1');
    enemy_name.innerText = enemy.name;
    enemy_selection.appendChild(enemy_name);

    var enemy_health = document.createElement('p');
    var enemy_max_health = enemy.maxhealth;
    var enemy_current_health = enemy.maxhealth;
    enemy_health.innerText = `Health: ${enemy_current_health} / ${enemy_max_health}`;
    enemy_selection.appendChild(enemy_health);

    var enemy_image = document.createElement('img');
    enemy_image.setAttribute('src', enemy.img_src);
    enemy_selection.appendChild(enemy_image);

    var attack1 = document.createElement('button');
    attack1.innerText = `${enemy.attack1} Damage Attack`;
    enemy_selection.appendChild(attack1);
    page_container.appendChild(enemy_selection);
}

function selection_card(user_selection) {
    var selected = chosen_one[user_selection];
    if (selected === undefined) {
        document.body.innerHTML = "<h1>Please Choose a valid pokemon!</h1>";
    } else {
        var chosen_selection = document.getElementById('chosen_selection');
        // Displaying Chosen message
        chosen_selection.innerText = `You have picked ${selected.name} Nice!`;
        // setting up our health variables
        var user_pokemon_health = document.createElement('p');
        var user_current_health = selected.maxhealth;
        user_pokemon_health.innerText = `Health: ${user_current_health} / ${selected.maxhealth}`
        chosen_selection.appendChild(user_pokemon_health);
        // Creating and displaying the chosen image
        var pokemon_selected = document.createElement('img');
        pokemon_selected.setAttribute('src', selected.img_src);
        // Appending image to parent
        chosen_selection.appendChild(pokemon_selected);

        var attack1 = document.createElement('button');
        attack1.innerText = `${selected.attack1} Damage Attack`;
        chosen_selection.appendChild(attack1);

    }
}

var enemy_pokemon =

{
    name: 'Squirtle',
    img_src: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc2MjY3Mzg3MDczNDcxNjc4/pokemon-squirtle-nicknames.jpg",
    maxhealth: 40,
    attack1: 5,
    attack2: 7,
    attack3: 9

}


var page_container = document.getElementById('page_container');

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

var user_selection = Cookies.get('chosen');
selection_card(user_selection);

enemy_selection(enemy_pokemon);