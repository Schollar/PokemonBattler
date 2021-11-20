// One comment because these are all the same, creating a function to create a cookie for each different pokemon
// Then setting each function to an onclick in the html corresponding button
function pokemon_selection(poke) {

    Cookies.set('chosen', poke)
    var game_state = {

        userMaxHealth: 40,
        userCurrentHealth: 40,
        computerCurrentHealth: 40,
        computerMaxHealth: 40,
        userPokemonSelection: poke,
        computerPokemonSelection: "squirtle"
    }
    Cookies.set('game_status', JSON.stringify(game_state));
}

var pokemon = {

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