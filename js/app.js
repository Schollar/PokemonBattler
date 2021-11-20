// One comment because these are all the same, creating a function to create a cookie for each different pokemon
// Then setting each function to an onclick in the html corresponding button
function pokemon_selection(poke) {

    Cookies.set('chosen', poke)
    var computer_selection = Math.random() * (4 - 1) + 1;
    if (computer_selection >= 3) {
        var computer_pokemon_selected = enemy_pokemon.charmander;
    } else if (computer_selection >= 2) {
        var computer_pokemon_selected = enemy_pokemon.pikachu;
    } else {
        var computer_pokemon_selected = enemy_pokemon.squirtle;
    }
    var game_state = {

        userMaxHealth: 40,
        userCurrentHealth: 40,
        computerCurrentHealth: computer_pokemon_selected.maxhealth,
        computerMaxHealth: 40,
        userPokemonSelection: poke,
        computerPokemonSelection: computer_pokemon_selected
    }
    Cookies.set('game_status', JSON.stringify(game_state));
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