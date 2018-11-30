import React from 'react';
import Phaser from "phaser-ce"


export default class LocalGame extends React.Component {

    componentDidMount=()=>{
      // let config={
      //   width: (window.innerWidth * 0.70),
      //   height: window.innerHeight,
      //   renderer: Phaser.CANVAS,
      //   parent: 'gameboard',
      //   state: {
      //     preload: preload,
      //     create: create,
      //     update: update,
      //     render: render
      //   },
      //   clearBeforeRender: true
      // }

      let game = new Phaser.Game(
        (window.innerWidth * 0.70),
        window.innerHeight,
        Phaser.CANVAS,
        'gameboard',
      {
        preload: preload,
        create: create,
        update: update,
        render: render
      });

      function preload() {
        game.load.image('p1Bullet', 'https://i.imgur.com/1ZncTHv.png');
        game.load.image('playerOne', 'https://i.imgur.com/E4dSIaY.png');
        game.load.image('p2Bullet', 'https://i.imgur.com/PM0aRt2.png');
        game.load.image('playerTwo', 'https://i.imgur.com/nAWwo16.png');
        game.load.image('background', "https://i.imgur.com/9JtcWlW.png")
        game.load.image('health', "https://i.imgur.com/RCqebgh.png")
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
      let healthOne;
      let healthTwo;
      let healthThree;
      let healthFour;

      function create() {
        game.time.events.add(20000, gameOverClock, this)
        game.add.sprite(0, 0, 'background')

        healthOne = game.add.sprite(50, 50, 'health')
        game.physics.arcade.enable(healthOne)

        healthTwo = game.add.sprite(((window.innerWidth * 0.70) - 50), 50, 'health')
        game.physics.arcade.enable(healthTwo)

        healthThree = game.add.sprite(((window.innerWidth * 0.70) - 50), (window.innerHeight -50), 'health')
        game.physics.arcade.enable(healthThree)

        healthFour = game.add.sprite(50, (window.innerHeight -50), 'health')
        game.physics.arcade.enable(healthFour)

        playerOne = this.add.sprite(0, (window.innerHeight / 2), 'playerOne');
        p1Weapon = game.add.weapon(10, 'p1Bullet');

        playerTwo = this.add.sprite((window.innerWidth - 13), (window.innerHeight / 2), 'playerTwo');
        p2Weapon = game.add.weapon(10, 'p2Bullet');

        p1Forward = this.input.keyboard.addKey(Phaser.KeyCode.W)
        p1Right = this.input.keyboard.addKey(Phaser.KeyCode.D)
        p1Left = this.input.keyboard.addKey(Phaser.KeyCode.A)
        p1Shoot = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT)

        p2Forward = this.input.keyboard.addKey(Phaser.KeyCode.UP)
        p2Right = this.input.keyboard.addKey(Phaser.KeyCode.RIGHT)
        p2Left = this.input.keyboard.addKey(Phaser.KeyCode.LEFT)
        p2Shoot = this.input.keyboard.addKey(Phaser.KeyCode.QUESTION_MARK)

        createPlayer(playerOne, p1Weapon, this)
        createPlayer(playerTwo, p2Weapon, this)
      }

      function createPlayer(player, laser) {
        laser.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        laser.bulletSpeed = 600;
        laser.fireRate = 100;
        player.anchor.set(0.5);
        player.alive = true
        player.health = 100

        game.physics.arcade.enable([player]);
        player.body.collideWorldBounds = true;
        player.body.bounce.set(1)

        player.body.drag.set(70);
        player.body.maxVelocity.set(200);

        player.key === "playerTwo" ? player.angle = 180 : player.angle = 0

        laser.trackSprite(player, 0, 0, true);
      }

       function update() {

        if (p1Forward.isDown) {
          game.physics.arcade.accelerationFromRotation(playerOne.rotation, 300, playerOne.body.acceleration);
        } else {
          playerOne.body.acceleration.set(0);
        }

        if (p1Left.isDown) {
          playerOne.body.angularVelocity = -300;
        } else if (p1Right.isDown) {
          playerOne.body.angularVelocity = 300;
        } else {
          playerOne.body.angularVelocity = 0;
        }

        if (p1Shoot.isDown && p1Shoot.event.location === 1) {
          p1Weapon.fire();
        }

        //*********
        if (p2Forward.isDown) {
          game.physics.arcade.accelerationFromRotation(playerTwo.rotation, 300, playerTwo.body.acceleration);
        } else {
          playerTwo.body.acceleration.set(0);
        }

        if (p2Left.isDown) {
          playerTwo.body.angularVelocity = -300;
        } else if (p2Right.isDown) {
          playerTwo.body.angularVelocity = 300;
        } else {
          playerTwo.body.angularVelocity = 0;
        }

        if (p2Shoot.isDown) {
          p2Weapon.fire();
        }

        game.world.wrap(playerOne, 16);

        game.physics.arcade.overlap(playerTwo, p1Weapon.bullets, playerTwoDamage, null, this)
        game.physics.arcade.overlap(playerOne, p2Weapon.bullets, playerOneDamage, null, this)
        game.physics.arcade.collide(playerOne, playerTwo, bouceBois, null, this)

        game.physics.arcade.overlap(playerTwo, healthOne, health, null, this)
        game.physics.arcade.overlap(playerOne, healthOne, health, null, this)

        game.physics.arcade.overlap(playerTwo, healthTwo, health, null, this)
        game.physics.arcade.overlap(playerOne, healthTwo, health, null, this)

        game.physics.arcade.overlap(playerTwo, healthThree, health, null, this)
        game.physics.arcade.overlap(playerOne, healthThree, health, null, this)

        game.physics.arcade.overlap(playerTwo, healthFour, health, null, this)
        game.physics.arcade.overlap(playerOne, healthFour, health, null, this)

        if (playerTwo.health === 0 || playerOne.health === 0) {
          gameOverClock()
        }
      }

      function playerTwoDamage(obj1, obj2) {
        obj1.damage(12.5)
        obj2.kill()
        p1Weapon.createBullets(1)
      }

      function playerOneDamage(obj1, obj2) {
        obj1.damage(12.5)
        obj2.kill()
        p2Weapon.createBullets(1)
      }

      function bouceBois(obj1, obj2) {
        obj1.body.bounce.set(1)
        obj2.body.bounce.set(1)
      }

      function health(obj1, obj2){
        obj1.damage(-25)
        obj2.destroy()
      }

       const gameOverClock=()=> {
        game.physics.arcade.isPaused = true
        if (playerOne.health === 100 && playerTwo.health === 100) {
          alert("You guys stink!")
        } else if (playerOne.health === playerTwo.health) {
          alert("You tied?! Lame.")
        } else if (playerOne.health === 0) {
          this.props.increaseScore(playerOne)
          alert("Player One died? That makes them a winner in my book!")
        } else if (playerTwo.health === 0) {
          this.props.increaseScore(playerTwo)
          alert("Player Two died? That makes them a winner in my book!")
        } else if (playerOne.health > playerTwo.health) {
          this.props.increaseScore(playerOne)
          alert("Player One wins!")
        } else if (playerTwo.health > playerOne.health) {
          this.props.increaseScore(playerTwo)
          alert("Player Two wins!")
        }
        game.destroy()
        this.props.renderStartButton()
      }

      function render() {
        game.debug.text("Time until game over: " + game.time.events.duration, 32, 32)
        game.debug.text("Player One Health:" + playerOne.health, 32, 48)
        game.debug.text("Player Two Health:" + playerTwo.health, 32, 64)
      }
    }

  render() {
    return (
      null
    );
  }
};
