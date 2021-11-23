function pokemon_selection(pokemon) {
    // DO an error check to see if user did anything tricky
    if (pokemon === undefined) {
        var parent_container = document.getElementById('page_container');
        parent_container.innerText = "Oops! You must select a pokemon!"
    } else {
        // Set our selected pokemon to a variable, stringify it and store it as a cookie
        var selected_pokemon = JSON.stringify(list_of_pokemon[pokemon]);
        Cookies.set('chosen', (selected_pokemon));
        // Store the pokemon ojbect the user has selected
        var user_selected = list_of_pokemon[pokemon];
        // Doing math to get a random number between 1 and 4
        var computer_selection = Math.random() * (4 - 1) + 1;
        // According to the number we get, it will choose the enemy pokemon
        if (computer_selection >= 3) {
            var computer_pokemon_selected = list_of_pokemon.charizard;
        } else if (computer_selection >= 2) {
            var computer_pokemon_selected = list_of_pokemon.pikachu;
        } else {
            var computer_pokemon_selected = list_of_pokemon.squirtle;
        }
        //Setting our game state object 
        var game_state = {

            userMaxHealth: user_selected.maxhealth,
            userCurrentHealth: user_selected.maxhealth,
            computerCurrentHealth: computer_pokemon_selected.maxhealth,
            computerMaxHealth: computer_pokemon_selected.maxhealth,
            userPokemonSelection: user_selected,
            computerPokemonSelection: computer_pokemon_selected
        };
        // Setting our object as a cookie
        Cookies.set('game_status', JSON.stringify(game_state));
        // CHanging pages to battlepage
        window.location = '/pages/selection.html'
    }
}
// Function which injects pokemon to choose from onto the page
function inject_pokemon(object) {
    // Get parent element store it into a variable
    var parent_container = document.getElementById('page_container');
    // Create our card section
    var card_section = document.createElement('section');
    card_section.classList.add('card');
    // Create our Health, image, attacks container and setting it to our objects corresponding values
    var health_tag = document.createElement('p');
    health_tag.innerText = `Health: ${object.maxhealth}`;

    var pokemon_image = document.createElement('img');
    pokemon_image.setAttribute('src', object.img_src);

    var attacks_container = document.createElement('section');
    attacks_container.classList.add('attacks_container');

    var attack_heading = document.createElement('h1');
    attack_heading.innerText = "Attacks:";
    attacks_container.appendChild(attack_heading);
    // Loop through the attacks array and display them for each pokemon
    for (var i = 0; i < object.attacks.length; i++) {
        var attack = document.createElement('p');
        attack.innerText = `${object.attacks[i].name}`;
        attacks_container.appendChild(attack);
    }
    // Setting  up our button to be clicked.
    var select_button = document.createElement('button');
    select_button.setAttribute('onclick', `pokemon_selection('${object.name}')`);
    select_button.innerText = "Pick me!";
    // Appending children to the parent so we see it on our page

    card_section.appendChild(health_tag);
    card_section.appendChild(pokemon_image);
    card_section.appendChild(attacks_container);
    card_section.appendChild(select_button);
    parent_container.appendChild(card_section);
}
// In my own words, Object.keys gets the key's for my list of pokemon object, which would be the different pokemon names. Then it loops through each
// Pokemon object key with foreach, calling the function inject pokemon and passing my pokemon object from list of pokemon as an argument. 
Object.keys(list_of_pokemon).forEach((pokemon) => inject_pokemon(list_of_pokemon[pokemon]));