import React from 'react';
import Phaser from "phaser-ce"

const loadGame = ()=>{
  const game = new Phaser.Game((window.innerWidth * 0.75), window.innerHeight, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

    function preload() {
        game.load.image('p1Bullet', 'https://i.imgur.com/PM0aRt2.png');
        game.load.image('playerOne', 'https://i.imgur.com/nAWwo16.png');
        game.load.image('p2Bullet', 'https://i.imgur.com/1ZncTHv.png');
        game.load.image('playerTwo', 'https://i.imgur.com/WBjpFf5.png');
        game.load.image('background', "https://i.imgur.com/9JtcWlW.png")
    }

    let playerOne;
    let playerTwo;
    let p1Weapon;
    let p2Weapon;
    let cursors;
    let fireButton;
    let boostButton;
    let p2Forward;
    let p2Right;
    let p2Left;
    let p2Shoot;
    let timer;

    function create() {
        game.time.events.add(20000, gameOverClock, this)

        game.add.sprite(0, 0, 'background')

        p1Weapon = game.add.weapon(10, 'p1Bullet');
        p1Weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        p1Weapon.bulletSpeed = 600;
        p1Weapon.fireRate = 100;
        // p1Weapon.damage = 50;

        playerOne = this.add.sprite(0, (window.innerHeight/2), 'playerOne');
        playerOne.anchor.set(0.5);
        playerOne.alive= true
        playerOne.health= 100

        game.physics.arcade.enable([playerOne]);
        playerOne.body.collideWorldBounds = true;
        playerOne.body.bounce.set(1)

        playerOne.body.drag.set(70);
        playerOne.body.maxVelocity.set(200);

        p1Weapon.trackSprite(playerOne, 0, 0, true);

        cursors = this.input.keyboard.createCursorKeys();

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        boostButton = this.input.keyboard.addKey(Phaser.KeyCode.B)

        // ***********************

        playerTwo = this.add.sprite((window.innerWidth-13), (window.innerHeight/2), 'playerTwo');
        game.physics.arcade.enable([playerTwo])
        playerTwo.body.collideWorldBounds = true;
        playerTwo.body.bounce.set(1)
        playerTwo.anchor.set(0.5);
        playerTwo.alive= true
        playerTwo.health= 100
        playerTwo.angle= 180
        p2Weapon = game.add.weapon(10, 'p2Bullet');
        p2Weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        p2Weapon.bulletSpeed = 600;
        p2Weapon.fireRate = 100;
        // p2Weapon.damage = 100;
        playerTwo.body.drag.set(70);
        playerTwo.body.maxVelocity.set(200);

        p2Weapon.trackSprite(playerTwo, 0, 0, true);

        p2Forward = this.input.keyboard.addKey(Phaser.KeyCode.W)
        p2Right = this.input.keyboard.addKey(Phaser.KeyCode.D)
        p2Left = this.input.keyboard.addKey(Phaser.KeyCode.A)
        p2Shoot = this.input.keyboard.addKey(Phaser.KeyCode.C)

    }

    function update() {

        if (cursors.up.isDown){
            game.physics.arcade.accelerationFromRotation(playerOne.rotation, 300, playerOne.body.acceleration);
        } else{
            playerOne.body.acceleration.set(0);
        }

        if (cursors.left.isDown){
            playerOne.body.angularVelocity = -300;
        } else if (cursors.right.isDown){
            playerOne.body.angularVelocity = 300;
        } else{
            playerOne.body.angularVelocity = 0;
        }

        if (fireButton.isDown){
            p1Weapon.fire();
        }


        //*********
        if (p2Forward.isDown){
            game.physics.arcade.accelerationFromRotation(playerTwo.rotation, 300, playerTwo.body.acceleration);
        } else{
            playerTwo.body.acceleration.set(0);
        }

        if (p2Left.isDown){
            playerTwo.body.angularVelocity = -300;
        } else if (p2Right.isDown){
            playerTwo.body.angularVelocity = 300;
        } else{
            playerTwo.body.angularVelocity = 0;
        }

        if (p2Shoot.isDown){
            p2Weapon.fire();
        }
        //*********

        if (boostButton.isDown) {
          alert(playerTwo.health)
        }

        game.world.wrap(playerOne, 16);

        game.physics.arcade.overlap(playerTwo, p1Weapon.bullets, playerTwoDamage, null, this)
        game.physics.arcade.overlap(playerOne, p2Weapon.bullets, playerOneDamage, null, this)
        game.physics.arcade.collide(playerOne, playerTwo, bouceBois, null, this)

        if (playerTwo.health === 0 || playerOne.health === 0) {
          game.physics.arcade.isPaused = true
        }
    }

    // if (playerTwo.health === 0 || playerOne.health === 0) {
    //   game.physics.arcade.isPaused = true
    //     if (playerTwo.health === 0) {
    //       alert("Player Two died? That makes them a winner in my book!")
    //     } else {
    //       alert("Player One died? That makes them a winner in my book!")
    //     }
    // }

    function playerTwoDamage (obj1, obj2) {
      obj1.damage(20)
      obj2.destroy()
    }

    function playerOneDamage (obj1, obj2) {
      obj1.damage(20)
      obj2.destroy()
    }

    function bouceBois (obj1, obj2) {
      obj1.body.bounce.set(1)
      obj2.body.bounce.set(1)
    }

    function gameOverClock() {
    game.physics.arcade.isPaused = true
    if (playerOne.health === 100 && playerTwo.health === 100) {
      alert("You guys stink!")
    } else if (playerOne.health > playerTwo.health) {
      alert("Player One wins!")
    } else if (playerTwo.health > playerOne.health) {
      alert("Player Two wins!")
    }
  }


    function render() {
      game.debug.text("Time until game over: " + game.time.events.duration, 32, 32)
      game.debug.text("Player One Health:" + playerOne.health , 32, 48)
      game.debug.text("Player Two Health:" + playerTwo.health , 32, 64)
    }
}

const PlayingArea = () =>{
  return(
    <>
    {loadGame()}
    </>
  )
}

export default PlayingArea

    // <img src="https://i.imgur.com/9JtcWlW.png"/>
