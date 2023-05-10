new ChangelogSection('Version 1.2.1 Patch Notes:', 'Fixed bug where pausing and unpausing during "frozen time" would break the game.', null, null);
new ChangelogSection('Version 1.2.0 Release Notes:', 'Added dynamic point values; Smaller foods are now worth more points and point values are randomly generated for all foods.', null, null);
new ChangelogSection('Version 1.1.1 Patch Notes:', 'Added additional spawns during the "Infinite" wave of Survival mode.', 'Fixed bug where bombs showed up larger than normal.', 'Fixed bug where Frozen Watermelons and Peppers would not spawn during the "Infinite" wave of Survival mode.');
new ChangelogSection('Version 1.1.0 Release Notes:', 'Added a "Survival" mode.', 'Decreased bomb spawn rate. (33% -> 25%)', 'Added "Carrots" and "Tomatoes."');
new ChangelogSection('Version 1.0.0 Release Notes:', 'Renamed Fruit Fighters to Food Fighters.', 'Fixed bug where food would spawn stuck to the bottom of the page.', 'Optomized code for future updates.');

new Announcement('Version 1.2.0 Update:', 'Introducing dynamic point values! From now on, each type of food will be worth a random amount of points. In addition, smaller foods have the possibility to generate higher values. Check the almanac for more information.');

new Version;

new AlmanacPage('images/fruit-orange.png', 'Orange', '20%', '7-9', 'None', 'The orange was the first food added to Food Fighters.');
new AlmanacPage('images/fruit-watermelon.png', 'Watermelon', '20%', '7-9', 'None', 'Watermelons have the most rare variants, (as of now).');
new AlmanacPage('images/fruit-strawberry.png', 'Strawberry', '20%', '10-12', 'None', "Strawberries are the developer's favorite fruit!");
new AlmanacPage('images/fruit-pepper.png', 'Pepper', '5%', '7-9', 'When clicked, for 10 seconds, all fruits are worth double points.', 'The pepper was one of the most difficult fruits, artistically, to create.');
new AlmanacPage('images/fruit-bomb-almanac-image.png', 'Bomb', '25%', '0', "When clicked, the user is deducted one life. (Don't do this!)", "They have a cool animation... Although it's sad to say you've seen it.");
new AlmanacPage('images/fruit-frozen-watermelon.png', 'Frozen Watermelon', '2%', '7-9', 'When clicked, all fruits on the sceen are frozen for five seconds.', 'Grown only in the harshest conditions, these legendary fruits are said to be able to freeze time itself.');
new AlmanacPage('images/vegetable-carrot.png', 'Carrot', '20%', '7-9', 'None', 'Fun fact: Carrots are roots.');
new AlmanacPage('images/vegetable-tomato.png', 'Tomato', '20%', '10-12', 'None', "There's a heated debate as to whether tomatos are actually vegetables or not.");
