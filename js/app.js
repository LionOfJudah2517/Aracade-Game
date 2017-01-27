// Enemies our player must avoid
var Enemy = function(x, y, speed) {

    // Set x axis starting point for enemy. Enemy will be moving across the x axis
    this.x = x;
    // Set y axis starting point for enemy
    this.y = y;
    // Set the enemy's speed
    this.speed = speed;

    this.init = this.y;
    // Load the enemy's image
    this.sprite = 'images/enemy-bug.png';
};

//reset the enemy positions when needed
Enemy.prototype.reset = function() {
    this.y = this.init;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    //multiply x axis speed times dt
    this.x += dt * this.speed;
    //restarts the enemy back to the beginning to run loop continuously
    if (this.x > 500) {
        return this.x = 0;
    }
    if ((this.x >= player.x - 55 && this.x <= player.x + 55) && (this.y >= player.y - 55 && this.y <= player.y + 55)) {
        this.reset();
        player.reset();
    }
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


//Player object
var Player = function(x, y) {

    // Set x axis starting point for Player.
    this.x = x;
    // Set y axis starting point for Player.
    this.y = y;
    //Storage for the initial location of Player.
    this.init = {
        "x": x,
        "y": y,
    };
    // Player image upload.
    this.sprite = 'images/char-boy.png';
};


//When player wins, reset to starting position
Player.prototype.update = function(dt) {
  if (this.y <50) {
      this.reset();
    }
};
//draw the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//Control board for the player's movement
Player.prototype.handleInput = function(e) {
    switch (event.keyCode) {
        //control to move character left.
        case 37:
            if (this.x > 0) {
                return this.x += -100;
            }
            break;
            //control to move character up.
        case 38:
            if (this.y > 0) {
                return this.y += -80;
            }
            break;
            //control to move character right.
        case 39:
            if (this.x < 400) {
                return this.x += 100;
            }
            break;
            //control to move character down.
        case 40:
            if (this.y < 375) {
                return this.y += 80;
            }
            break;
    }
};
//reset the player when needed.
Player.prototype.reset = function() {
    this.x = this.init.x;
    this.y = this.init.y;

};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [
    new Enemy(6, 35, 150),
    new Enemy(7, 125, 350),
    new Enemy(8, 225, 75),
];

//Create/initialize new player
var player = new Player(200, 375);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
