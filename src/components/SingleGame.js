import React from 'react';
import Phaser from "phaser-ce"
import { NavLink, Redirect } from 'react-router-dom';

import { AppConsumer } from '../context/AppContext';


export default class LocalGame extends React.Component {

    componentDidMount=()=>{
      const EnemyTank = function(index, game, player, bullets) {

        let x = game.world.randomX;
        let y = game.world.randomY;

        this.game = game;
        this.player = player;
        this.bullets = bullets;
        this.fireRate = 1000;
        this.nextFire = 0;
        this.alive = true;
        this.health = 1

        this.tank = game.add.sprite(x, y, 'enemy', 'tank1');

        this.tank.anchor.set(0.5);

        this.tank.name = index.toString();
        game.physics.enable(this.tank, Phaser.Physics.ARCADE);
        this.tank.body.immovable = false;
        this.tank.body.collideWorldBounds = true;
        this.tank.body.bounce.setTo(1, 1);

        this.tank.angle = game.rnd.angle();

        game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);

      };

      EnemyTank.prototype.damage = function() {
        this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;
        this.tank.kill();
        enemiesAlive--
        return true;
    }

    return false;

      }

      EnemyTank.prototype.update = function() {

        this.game.physics.arcade.angleBetween(this.tank, this.player)
        this.tank.rotation = game.physics.arcade.angleBetween(this.tank, this.player)

        if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 300) {
          if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
            this.nextFire = this.game.time.now + this.fireRate;

            let bullet = this.bullets.getFirstDead();

            bullet.reset(this.tank.x, this.tank.y);

            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 500);
          }
        }

      };

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
        game.load.image('enemyBullet', 'https://i.imgur.com/PM0aRt2.png');
        game.load.image('enemy', 'https://i.imgur.com/nAWwo16.png');
        game.load.image('background', "https://i.imgur.com/Nbg44RR.png")
        game.load.image('health', "https://i.imgur.com/RCqebgh.png")
      }

      let playerOne;
      let p1Weapon;
      let p1Forward;
      let p1Right;
      let p1Left;
      let p1Shoot;
      let healthOne;
      let healthTwo;
      let healthThree;
      let healthFour;
      let enemies;
      let enemyBullets;
      let enemiesTotal = 0;
      let enemiesAlive = 0;

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

        p1Forward = this.input.keyboard.addKey(Phaser.KeyCode.W)
        p1Right = this.input.keyboard.addKey(Phaser.KeyCode.D)
        p1Left = this.input.keyboard.addKey(Phaser.KeyCode.A)
        p1Shoot = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT)

        createPlayer(playerOne, p1Weapon, this)

        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        enemyBullets.createMultiple(100, 'enemyBullet');

        enemyBullets.setAll('anchor.x', 0.5);
        enemyBullets.setAll('anchor.y', 0.5);
        enemyBullets.setAll('outOfBoundsKill', true);
        enemyBullets.setAll('checkWorldBounds', true);

        //  Create some baddies to waste :)
        enemies = [];

        enemiesTotal = 25;
        enemiesAlive = 25;

        for (let i = 0; i < enemiesTotal; i++)
        {
            enemies.push(new EnemyTank(i, game, playerOne, enemyBullets));
        }

      }

      function createPlayer(player, laser) {
        laser.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
        laser.bulletSpeed = 600;
        laser.fireRate = 100;
        player.anchor.set(0.5);
        player.alive = true
        player.health = 200

        game.physics.arcade.enable([player]);
        player.body.collideWorldBounds = true;
        player.body.bounce.set(1)

        player.body.drag.set(70);
        player.body.maxVelocity.set(200);

        player.angle = 0

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

        game.world.wrap(playerOne, 16);

        game.physics.arcade.overlap(playerOne, healthOne, health, null, this)
        game.physics.arcade.overlap(playerOne, healthTwo, health, null, this)
        game.physics.arcade.overlap(playerOne, healthThree, health, null, this)
        game.physics.arcade.overlap(playerOne, healthFour, health, null, this)

        game.physics.arcade.overlap(enemyBullets, playerOne, playerOneDamage, null, this)

        for (let i = 0; i < enemies.length; i++) {
          if (enemies[i].alive) {
            game.physics.arcade.collide(playerOne, enemies[i].tank, bouceBois, null, this)
            game.physics.arcade.overlap(p1Weapon.bullets, enemies[i].tank, enemyDamage, null, this)
            enemies[i].update();
          }
        }

        if (playerOne.health === 0 || enemiesAlive === 0) {
          gameOverClock()
        }
      }

      function enemyDamage(obj1, obj2) {
        obj2.kill()
        enemies[obj1.name].damage()
        debugger
        p1Weapon.createBullets(1)
      }

      function playerOneDamage(obj1, obj2) {
        obj1.damage(12.5)
        obj2.kill()
      }

      function bouceBois(obj1, obj2) {
        obj1.body.bounce.set(1)
        obj2.body.bounce.set(1)
      }

      function health(obj1, obj2){
        obj1.damage(-50)
        obj2.destroy()
      }

       const gameOverClock=()=> {
        game.physics.arcade.isPaused = true
        if (enemiesAlive === 0) {
          this.props.increaseScore()
          alert("You killed them? Wtf?")
        } else if (playerOne.health === 0) {
          this.props.decreaseScore()
          alert("You lost!")
        } else if (playerOne.health > 0) {
          this.props.increaseScore()
          alert("You survived? Impossible!")
        }
        game.destroy()
        this.props.renderStartButton()
      }

      function render() {
        game.debug.text("Time until game over: " + game.time.events.duration, 32, 32)
        game.debug.text("Player One Health:" + playerOne.health, 32, 48)
        game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 60)
      }
    }

  render() {
    return (
      null
    );
  }
};
