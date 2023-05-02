/* GAME INITIATION */
const game = new Phaser.Game(600, 400, Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update
});


/* VARIABLES */
// Title page UI variables
let background;
let startButton;
let discordButton;
let optionsButton;

// Game UI variables
let scoreText;
let lifeLostText;
let timeText;
let highScoreText;
let newHighScoreText;
let doubleTimeText;
let pausedText;
let pausedInfoText;
let frozenTimeText;
let heart1;
let heart2;
let heart3;
let lifeLostAnim1;
let lifeLostAnim2;
let lifeLostAnim3;
let waveText;
let waveTimeText;

// Numerical variables
let spawnInterval = 2000;
let score = 0;
let lives = 3;
let time = 0;
let timeMin = 0;
let timeSec = 0;
let highScoreClassic = localStorage.getItem('highScoreClassic') ?? 0;
let highScoreSurvival = localStorage.getItem('highScoreSurvival') ?? 0;
let doubleTimeTime = 10;
let frozenTimeTime = 5;
let waveTime = 60;

// Boolean variables
let newHighScore = false;
let paused = false;
let classicMode = false;
let survivalMode = false;

// Modifier variables
let doubleTime;
let frozenTime;

// "Survival" game mode variables
let wave = '1-fruit';


/* PHASER FUNCTIONS */
function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    // Fruits
    game.load.image('orange', 'images/fruit-orange.png');
    game.load.image('watermelon', 'images/fruit-watermelon.png');
    game.load.image('strawberry', 'images/fruit-strawberry.png');
    game.load.image('pepper', 'images/fruit-pepper.png');
    game.load.image('frozen-melon', 'images/fruit-frozen-watermelon.png');

    // Vegetables
    game.load.image('carrot', 'images/vegetable-carrot.png');
    game.load.image('tomato', 'images/vegetable-tomato.png');

    // Obstacles
    game.load.spritesheet('bomb', 'images/fruit-bomb.png', 64, 64, 4);

    // UI & Miscellaneous
    game.load.spritesheet('start-button', 'images/start-button-transparent-hover.png', 120, 40);
    game.load.image('background', 'images/background.png');
    game.load.spritesheet('lives-heart', 'images/lives-heart.png', 64, 64, 6);
    game.load.spritesheet('discord-icon', 'images/discord-logo-scaled.png', 29, 29);
    game.load.spritesheet('options-icon', 'images/settings-icon-no-border.png', 29, 29);
};

function create() {
    // Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;

    // Variables
    let style = { font: '18px Arial', fill: 'blue' };

    // Background
    background = game.add.tileSprite(0, 0, 600, 400, 'background');

    // Title page UI
    startButton = game.add.button(
        game.world.width * 0.5,
        game.world.height * 0.5,
        'start-button',
        showGameModes,
        this,
        1,
        0
    );
    startButton.anchor.set(0.5);
    discordButton = game.add.button(
        game.world.width - 5,
        5,
        'discord-icon',
        () => {
            location.replace('https://discord.gg/kASrYbpt4w');
        },
        1,
        0
    );
    discordButton.anchor.set(1, 0);
    optionsButton = game.add.button(
        5,
        5,
        'options-icon',
        showOptions,
        1,
        0
    );

    // Main game UI & Popups
    scoreText = game.add.text(5, 25, 'Score: 0', style);
    lifeLostText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'Life Lost!', {
        font: '20px Arial',
        fill: 'red'
    });
    lifeLostText.anchor.set(0.5);
    timeText = game.add.text(game.world.width * 0.5, 5, `${timeMin}:${(timeSec < 10) ? 0 : null}${timeSec}`, style);
    timeText.anchor.set(0.5, 0);
    highScoreText = game.add.text(5, 5, 'High Score: 0', style);
    newHighScoreText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'New high score!', {
        font: '20px Arial',
        fill: 'orange'
    });
    newHighScoreText.anchor.set(0.5);
    doubleTimeText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, `Double Points! ${doubleTimeTime}`, {
        font: '20px Arial',
        fill: 'orange'
    });
    doubleTimeText.anchor.set(0.5);
    pausedText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'Paused', {
        font: '30px Arial',
        fill: 'blue'
    });
    pausedText.anchor.set(0.5);
    pausedInfoText = game.add.text(game.world.width * 0.5, (game.world.height * 0.5) + 20, 'Press "p" to resume.', {
        font: '20px Arial',
        fill: 'blue'
    });
    pausedInfoText.anchor.set(0.5);
    frozenTimeText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, `Freeze! ${frozenTimeTime}`, {
        font: '20px Arial',
        fill: 'blue'
    });
    frozenTimeText.anchor.set(0.5);
    heart1 = game.add.sprite(game.world.width - 60, 5, 'lives-heart', 0);
    heart1.anchor.set(1, 0);
    heart1.scale.set(0.4);
    heart2 = game.add.sprite(game.world.width - 32.5, 5, 'lives-heart', 0);
    heart2.anchor.set(1, 0);
    heart2.scale.set(0.4);
    heart3 = game.add.sprite(game.world.width - 5, 5, 'lives-heart', 0);
    heart3.anchor.set(1, 0);
    heart3.scale.set(0.4);
    lifeLostAnim1 = heart1.animations.add('life-lost', [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
    lifeLostAnim2 = heart2.animations.add('life-lost', [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
    lifeLostAnim3 = heart3.animations.add('life-lost', [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4]);
    waveText = game.add.text(game.world.width * 0.5, 5, 'Wave 1: Fruits', style);
    waveText.anchor.set(0.5, 0);
    waveTimeText = game.add.text(game.world.width * 0.5, 25, `Time Remaining: ${waveTime}`, style);
    waveTimeText.anchor.set(0.5, 0);

    // Hide the game UI
    scoreText.visible = false;
    lifeLostText.visible = false;
    timeText.visible = false;
    highScoreText.visible = false;
    newHighScoreText.visible = false;
    doubleTimeText.visible = false;
    pausedText.visible = false;
    pausedInfoText.visible = false;
    frozenTimeText.visible = false;
    heart1.visible = false;
    heart2.visible = false;
    heart3.visible = false;
    waveText.visible = false;
    waveTimeText.visible = false;
};

function update() {}


/* TITLE PAGE FUNCTIONS */
function showGameModes() {
    document.getElementById('selectGameMode').style.display = 'block';
};

function startGame(value) {
    startButton.destroy();

    // Set game mode
    (value == 0) ? classicMode = true : survivalMode = true;

    // Initiate spawning and clock
    spawnFood = setInterval(initFood, spawnInterval);
    clock = setInterval(timer, 1000);

    // Initiate checks for bonus spawns
    (classicMode) ? setInterval(extraSpawns, 1000) : null;
    (survivalMode) ? setInterval(waveSpawns, 1000) : null;

    // Set the paused state
    paused = false;
    game.paused = false;

    // Hide the title page UI
    discordButton.destroy();
    optionsButton.destroy();
    document.getElementById('selectGameMode').style.display = 'none';

    // Update game UI based on game mode
    highScoreText.setText(`High Score: ${(classicMode) ? highScoreClassic : highScoreSurvival}`);

    // Show the game UI
    scoreText.visible = true;
    (survivalMode) ? timeText.visible = false : timeText.visible = true;
    highScoreText.visible = true;
    heart1.visible = true;
    heart2.visible = true;
    heart3.visible = true;
    (survivalMode) ? waveText.visible = true : waveText.visible = false;
    (survivalMode) ? waveTimeText.visible = true : waveTimeText.visible = false;
};

function showOptions() {
    document.getElementById('options').style.display = 'block';
}

function toggleOptions(value) {
    document.getElementById('options').style.display = (value == 1) ? 'block' : 'none';
};

function toggleChangelog(value) {
    document.getElementById('changelog').style.display = (value == 1) ? 'block' : 'none';
    (value == 1) ? setContentHeight() : null;
};

function setContentHeight() {
    // Declare variables
    let totalHeight;
    let titleHeight;
    let remainingHeight;

    // Calculate the value to be stored in each variable
    totalHeight = document.getElementById('changelog').clientHeight;
    let margin = document.getElementById('changelogTitle').currentStyle || window.getComputedStyle(document.getElementById('changelogTitle'));
    titleHeight = (document.getElementById('changelogTitleBox').clientHeight) + (parseFloat(margin.marginTop)) * 2;
    remainingHeight = (totalHeight - titleHeight) - 2;

    document.getElementById('changelogContent').style.height = remainingHeight + 'px';
    window.addEventListener('resize', setContentHeight);
};

function toggleAlmanac(value) {
    document.getElementById('almanac').style.display = (value == 1) ? 'block' : 'none';
};

function changeAlmanacTab(value) {
    let tabs = ['fruitsTab', 'vegetablesTab', 'obstaclesTab'];
    tabs.forEach(element => document.getElementById(`${element}`).classList.remove('activeAlmanacTab'));
    document.getElementById(`${(value >= 0 && value <= 4) ? 'fruitsTab' : (value >= 5 && value <= 6) ? 'vegetablesTab' : 'obstaclesTab'}`).classList.add('activeAlmanacTab');
    let pages = ['almanacContentOrange', 'almanacContentWatermelon', 'almanacContentStrawberry', 'almanacContentPepper', 'almanacContentBomb', 'almanacContentFrozenWatermelon', 'almanacContentCarrot', 'almanacContentTomato'];
    pages.forEach(element => document.getElementById(`${element}`).style.display = 'none');
    document.getElementById(`${(value == 0) ? 'almanacContentOrange' : (value == 1) ? 'almanacContentWatermelon' : (value == 2) ? 'almanacContentStrawberry' : (value == 3) ? 'almanacContentPepper' : (value == 4) ? 'almanacContentFrozenWatermelon' : (value == 5) ? 'almanacContentCarrot' : (value == 6) ? 'almanacContentTomato' : 'almanacContentBomb'}`).style.display = 'block';
};


/* GAME FUNCTIONS */
function initFood(value) {
    // Setup
    let foodType = genFoodType();
    let frozenMelon = (wave == '1-fruit' || wave == 'infinite') ? (foodType == 'watermelon') ? genRandomNumber(1, 50) == 50 : false : false;
    let pepper = (wave == '1-fruit' || wave == 'infinite') ? (frozenMelon) ? false : genRandomNumber(1, 20) == 20 : false;
    let bomb = (pepper) ? false : genRandomNumber(1, 4) == 4;
    let specialFood = (frozenMelon || pepper || bomb) ? true : false;
    let right = genRandomNumber(1, 2) == 2;
    let gravityX = genRandomNumber(5, 12);
    let rightSideSpawn = genRandomNumber(1, 2) == 1;
    let newFood = game.add.sprite(
        (value == 2) ? ((rightSideSpawn) ? (game.world.width - 600) : game.world.width + 0) : (game.world.width - (genRandomNumber(250, 350))),
        (value == 2) ? (game.world.height * 0.5) : (game.world.height),
        `${(pepper) ? 'pepper' : (bomb) ? 'bomb' : (frozenMelon) ? 'frozen-melon' : foodType}`,
        (bomb) ? 0 : null
    );
    newFood.anchor.set(0.5);
    newFood.scale.set((specialFood) ? 0.6 : (foodType == 'carrot' || foodType == 'tomato') ? 0.7 : 0.6);
    let explode = (bomb) ? newFood.animations.add('explode', [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3], 10): null;

    // Physics
    game.physics.enable(newFood, Phaser.Physics.ARCADE);
    newFood.body.velocity.set((value == 2) ? ((rightSideSpawn) ? 150 : -150) : 0, (value == 2) ? -20 : -175);
    newFood.body.gravity.y = (wave == '2-vegetables') ? genRandomNumber(45, 60) : genRandomNumber(45, 90);
    newFood.body.gravity.x = (right) ? gravityX : -gravityX;

    // On-click events
    newFood.inputEnabled = true;
    newFood.events.onInputDown.add(() => {
        if (frozenMelon) {
            frozenTimeTime = 5;
            initFrozenTime();
        };
        if (pepper) {
            initDoubleTime();
        }
        if (!bomb && !paused) {
            score += (doubleTime) ? 20 : 10;
            if ((score > highScoreClassic || score > highScoreSurvival) && !newHighScore && !doubleTime) {
                newHighScoreText.visible = true;
                newHighScore = true;
                setTimeout(() => {
                    newHighScoreText.visible = false;
                }, 5000);
            }
            scoreText.setText(`Score: ${score}`);
        }
        if (bomb && !paused) {
            newFood.animations.play('explode', 10, false);
            explode.onComplete.add(() => {
                newFood.kill();
            }, this);
            lives--;
            lifeLost();
            if (doubleTime) {
                doubleTimeText.visible = false;
                lifeLostText.visible = true;
                setTimeout(() => {
                    lifeLostText.visible = false;
                    if (doubleTime) {
                        doubleTimeText.visible = true;
                    }
                }, 3000)
            }
            if (!doubleTime) {
                lifeLostText.visible = true;
                setTimeout(() => {
                    lifeLostText.visible = false;
                }, 3000)
            }
            if (!lives) {
                gameLost();
            }
        }
        if (!bomb && !paused) {
            newFood.kill();
        }
    }, this);

    // World border events
    newFood.checkWorldBounds = true;
    newFood.events.onOutOfBounds.add(() => {
        if (!bomb) {
            lives--;
            lifeLost();
            if (doubleTime) {
                doubleTimeText.visible = false;
                lifeLostText.visible = true;
                setTimeout(() => {
                    lifeLostText.visible = false;
                    if (doubleTime) {
                        doubleTimeText.visible = true;
                    }
                }, 3000)
            }
            if (!doubleTime) {
                lifeLostText.visible = true;
                setTimeout(() => {
                    lifeLostText.visible = false;
                }, 3000)
            }
            if (!lives) {
                gameLost();
            }
        }
    }, this);

    // Rotate
    setInterval(() => {
        newFood.angle += (right) ? (genRandomNumber(1, 2)) : -(genRandomNumber(1, 2));
    }, 200);

    // Increase spawn rate
    if (value !== 1) {
        changeSpawnInterval();
    }
};

function genFoodType() {
    let types = ['orange', 'watermelon', 'strawberry', 'carrot', 'tomato'];
    let fruitTypes = ['orange', 'watermelon', 'strawberry'];
    let vegetableTypes = ['carrot', 'tomato'];
    return ((classicMode || wave == 'infinite') ? types : (wave == '1-fruit') ? fruitTypes : vegetableTypes)[Math.floor(Math.random() * (((classicMode || wave == 'infinite') ? types : (wave == '1-fruit') ? fruitTypes : vegetableTypes).length))];
};

function changeSpawnInterval() {
    clearInterval(spawnFood);
    if (spawnInterval > 1000) {
        spawnInterval -= 100;
        spawnFood = setInterval(initFood, spawnInterval);
    } else {
        spawnFood = setInterval(initFood, spawnInterval);
    }
};

function lifeLost() {
    if (lives == 2) {
        heart1.animations.play('life-lost', 15, false);
        lifeLostAnim1.onComplete.add(() => {
            heart1.visible = false;
        }, this);
        let lostHeart1 = game.add.sprite(game.world.width - 60, 5, 'lives-heart', 5);
        lostHeart1.anchor.set(1, 0);
        lostHeart1.scale.set(0.4);
    } else if (lives == 1) {
        heart2.animations.play('life-lost', 15, false);
        lifeLostAnim2.onComplete.add(() => {
            heart2.visible = false;
        }, this);
        let lostHeart2 = game.add.sprite(game.world.width - 32.5, 5, 'lives-heart', 5);
        lostHeart2.anchor.set(1, 0);
        lostHeart2.scale.set(0.4);
    } else if (lives == 0) {
        heart3.animations.play('life-lost', 15, false);
        heart3.animations.play('life-lost', 15, false);
        lifeLostAnim3.onComplete.add(() => {
            heart3.visible = false;
        }, this);
        let lostHeart3 = game.add.sprite(game.world.width - 5, 5, 'lives-heart', 5);
        lostHeart3.anchor.set(1, 0);
        lostHeart3.scale.set(0.4);
    }
};

function gameLost() {
    alert(`You lost! Your final score was ${score}.`);
    if (score > highScoreClassic || score > highScoreSurvival) {
        localStorage.setItem(`highScore${(classicMode) ? 'Classic' : 'Survival'}`, score);
    }
    location.reload();
};

function timer() {
    // Update time values
    time++;
    timeSec++;
    if (timeSec == 60) {
        timeSec -= 60;
        timeMin ++;
    }

    // Update "double time"
    if (doubleTime) {
        doubleTimeTime--;
        if (doubleTimeTime == 0) {
            doubleTime = false;
            doubleTimeText.visible = false;
        }
        doubleTimeText.setText(`Double Points! ${doubleTimeTime}`);
    }

    // Update "frozen time"
    if (frozenTime) {
        frozenTimeTime--;
        if (frozenTimeTime == 0) {
            frozenTime = false;
            game.paused = false;
            spawnFood = setInterval(initFood, spawnInterval);
            frozenTimeText.visible = false;
            (doubleTime) ? doubleTimeText.visible = true : null;
        }
        frozenTimeText.setText(`Freeze! ${frozenTimeTime}`);
    }

    // Update wave time
    if (survivalMode) {
        (wave == 'infinite') ? waveTime++ : waveTime--;
        if (waveTime == 0 && wave !== 'infinite') {
            wave = (wave == '1-fruit') ? '2-vegetables' : (wave == '2-vegetables') ? 'infinite' : null;
            waveText.setText(`${(wave == 'infinite') ? 'Infinite' : `Wave ${(wave == '1-fruit') ? '1' : '2'}: ${(wave == '1-fruit') ? 'Fruits' : 'Vegetables'}`}`);
            waveTime = (wave == 'infinite') ? 0 : 60;
            waveTimeText.setText(`${(wave == 'infinite') ? 'Time Survived' : 'Time Remaining'}: ${waveTime}`);
        }
        waveTimeText.setText(`${(wave == 'infinite') ? 'Time Survived' : 'Time Remaining'}: ${waveTime}`);
    }

    // Update timer text
    timeText.setText(`${timeMin}:${(timeSec < 10) ? 0 : ''}${timeSec}`);
};

function extraSpawns() {
    if (!paused && !frozenTime) {
        // Add additional bottom spawns
        if (time >= 30) {
            initFood(1);
        }
        if (time >= 60) {
            initFood(1);
        }

        // Add additional side spawns
        if (time >= 90) {
            initFood(2);
        }
        if (time >= 120) {
            initFood(2);
        }
    }
};
(classicMode) ? setInterval(extraSpawns, 1000) : null;

function waveSpawns() {
    if (wave == '1-fruit' && !paused && !frozenTime) {
        if (waveTime <= 30) {
            initFood(1);
        }
    }
    if (wave == '2-vegetables' && !paused && !frozenTime) {
        if (waveTime <= 45) {
            initFood(1);
        }
        if (waveTime <= 30) {
            initFood(1);
        }
        if (waveTime <= 15) {
            initFood(1);
        }
    }
    if (wave == 'infinite' && !paused && !frozenTime) {
        // Add additional bottom spawns
        if (waveTime >= 15) {
            initFood(1);
        }
        if (waveTime >= 30) {
            initFood(1);
        }
        if (waveTime >= 45) {
            initFood(1);
        }
        if (waveTime >= 60) {
            initFood(1);
        }

        // Add additional side spawns
        if (waveTime >= 75) {
            initFood(2);
        }
        if (waveTime >= 90) {
            initFood(2);
        }
        if (waveTime >= 105) {
            initFood(2);
        }
        if (waveTime >= 120) {
            initFood(2);
        }
    }
};
(survivalMode) ? setInterval(waveSpawns, 1000) : null;

function initDoubleTime() {
    if (!doubleTime) {
        doubleTime = true;
        doubleTimeTime = 10;
    } else {
        return;
    }

    // Clear other UI popups
    lifeLostText.visible = false;
    newHighScoreText.visible = false;

    // Show "double time" text, if applicable
    if (!frozenTime) {
        doubleTimeText.visible = true;
    }
};

function initFrozenTime() {
    game.paused = true;
    clearInterval(spawnFood);

    // Clear other UI popups
    lifeLostText.visible = false;
    newHighScoreText.visible = false;
    doubleTimeText.visible = false;
    frozenTimeText.visible = true;
    frozenTime = true;
};

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 80) {
        if (!paused) {
            // Pause the game
            game.paused = true;
            clearInterval(clock);
            clearInterval(spawnFood);

            // Clear other UI popups
            doubleTimeText.visible = false;
            lifeLostText.visible = false;
            newHighScoreText.visible = false;

            // Show "paused" text
            pausedText.visible = true;
            pausedInfoText.visible = true;

            paused = true;
        } else {
            if (!frozenTime) {
                game.paused = false;
            }

            // Re-initiate spawing and clock
            clock = setInterval(timer, 1000);
            spawnFood = setInterval(initFood, spawnInterval);

            // Hide "paused" text
            pausedText.visible = false;
            pausedInfoText.visible = false;

            // Show "double time" text, if applicable
            (doubleTime) ? doubleTimeText.visible = true : null;

            paused = false;
        }
    }
});

window.addEventListener('blur', () => {
    // Pause the game
    game.paused = true;
    clearInterval(clock);
    clearInterval(spawnFood);

    // Clear other UI popups
    doubleTimeText.visible = false;
    lifeLostText.visible = false;
    newHighScoreText.visible = false;

    // Show "paused" text
    pausedText.visible = true;
    pausedInfoText.visible = true;

    paused = true;
});


/* MISCELLANEOUS FUNCTIONS */
function genRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};