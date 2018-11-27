import React from 'react';
import Phaser from "phaser-ce"

const loadGame = (props)=>{
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
    let p1Forward;
    let p1Right;
    let p1Left;
    let p1Shoot;
    let p2Forward;
    let p2Right;
    let p2Left;
    let p2Shoot;
    let timer;

    function create() {
        // game.time.events.add(20000, gameOverClock, this)
        game.add.sprite(0, 0, 'background')

        playerOne = this.add.sprite(0, (window.innerHeight/2), 'playerOne');
        p1Weapon = game.add.weapon(10, 'p1Bullet');

        playerTwo = this.add.sprite((window.innerWidth-13), (window.innerHeight/2), 'playerTwo');
        p2Weapon = game.add.weapon(10, 'p2Bullet');

        p1Forward = this.input.keyboard.addKey(Phaser.KeyCode.P)
        p1Right = this.input.keyboard.addKey(Phaser.KeyCode.QUOTES)
        p1Left = this.input.keyboard.addKey(Phaser.KeyCode.L)
        p1Shoot = this.input.keyboard.addKey(Phaser.KeyCode.ENTER)

        p2Forward = this.input.keyboard.addKey(Phaser.KeyCode.S)
        p2Right = this.input.keyboard.addKey(Phaser.KeyCode.C)
        p2Left = this.input.keyboard.addKey(Phaser.KeyCode.Z)
        p2Shoot = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT)

        createPlayer(playerOne, p1Weapon, this)
        createPlayer(playerTwo, p2Weapon, this)
    }

    function createPlayer(player, laser){
      laser.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      laser.bulletSpeed = 600;
      laser.fireRate = 100;
      player.anchor.set(0.5);
      player.alive= true
      player.health= 100

      game.physics.arcade.enable([player]);
      player.body.collideWorldBounds = true;
      player.body.bounce.set(1)

      player.body.drag.set(70);
      player.body.maxVelocity.set(200);

      player.key === "playerTwo" ? player.angle = 180 : player.angle=0

      laser.trackSprite(player, 0, 0, true);
    }

    function update() {

        if (p1Forward.isDown){
            game.physics.arcade.accelerationFromRotation(playerOne.rotation, 300, playerOne.body.acceleration);
        } else{
            playerOne.body.acceleration.set(0);
        }

        if (p1Left.isDown){
            playerOne.body.angularVelocity = -300;
        } else if (p1Right.isDown){
            playerOne.body.angularVelocity = 300;
        } else{
            playerOne.body.angularVelocity = 0;
        }

        if (p1Shoot.isDown){
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

        if (p2Shoot.isDown && p2Shoot.event.location ===1){
            p2Weapon.fire();
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
      obj1.damage(12.5)
      obj2.destroy()
    }

    function playerOneDamage (obj1, obj2) {
      obj1.damage(12.5)
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

const LocalPlayingArea = (props) =>{
  return(
    <>
      {loadGame(props)}
    </>
  )
}

export default LocalPlayingArea
