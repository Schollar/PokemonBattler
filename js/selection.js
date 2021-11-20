// Here we write the function that attaches to our button that removes the cookies and sends user back to selection page
function remove_selection() {
    Cookies.remove('chosen');
}


function selection_card(user_selection) {
    var selected = chosen_one[user_selection];
    if (selected === undefined) {
        document.body.innerHTML = "<h1>Please Choose a valid pokemon!</h1>";
    } else {
        var chosen_selection = document.getElementById('chosen_selection');
        // Displaying Chosen message
        chosen_selection.innerText = `You have picked ${selected.name} Nice!`;
        // Creating and displaying the chosen image
        var pokemon_selected = document.createElement('img');
        pokemon_selected.setAttribute('src', selected.img_src);
        // Appending image to parent
        chosen_selection.appendChild(pokemon_selected);
    }
}
// Setting up an array of objects to use based on selection
var chosen_one = {

    squirtle: {
        name: 'squirtle',
        img_src: "https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTc2MjY3Mzg3MDczNDcxNjc4/pokemon-squirtle-nicknames.jpg",
        health: 40,
        attack1: 5,
        attack2: 7,
        attack3: 9

    },
    charmander: {
        name: 'charmander',
        img_src: "https://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/d/d4/Charmander.gif",
        health: 40,
        attack1: 5,
        attack2: 7,
        attack3: 9
    },
    bulbasaur: {
        name: 'bulbasaur',
        img_src: "https://64.media.tumblr.com/172a6e167359e6b6832116ffac691e87/tumblr_inline_p7ja2uo4ZQ1qhvvv4_500.png",
        health: 40,
        attack1: 5,
        attack2: 7,
        attack3: 9
    },
    pikachu: {
        name: 'pikachu',
        img_src: "https://secure.img1-fg.wfcdn.com/im/77981853/resize-h755-w755%5Ecompr-r85/8470/84707680/Pokemon+Pikachu+Wall+Decal.jpg",
        health: 40,
        attack1: 5,
        attack2: 7,
        attack3: 9
    }
};

var user_selection = Cookies.get('chosen');
selection_card(user_selection);