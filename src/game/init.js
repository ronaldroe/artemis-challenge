import Phaser from "phaser";
import HealthBar from "./health";
import { calcMoveSpeed } from "./math";

const init = async () => {
  const config = {
    type: Phaser.AUTO,
    parent: "game",
    width: window.innerWidth,
    height: window.innerHeight * 0.9,
    scene: {
      preload: preload,
      create: create,
      update: update,
    },
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 500 },
        debug: false,
      },
    },
  };

  const game = new Phaser.Game(config);

  async function preload() {
    this.load.image("player1", "./sprites/player-1.png");
    this.load.image("player2", "./sprites/player-2.png");
    this.load.image("player3", "./sprites/player-3.png");
    this.load.image("waterDroplet", "./sprites/water-droplet.png");
    this.load.image("co2", "./sprites/co2.png");
    this.load.image("sun", "./sprites/sun.png");
  }

  async function create() {
    // Need to extract entities into their own classes
    this.player = this.physics.add.sprite(
      this.sys.game.canvas.width / 2,
      this.sys.game.canvas.height,
      "player1"
    );

    this.player.setCollideWorldBounds(true);

    this.startHealth = false;

    window.setTimeout(() => {
      this.startHealth = true;
    }, 3000);

    this.healthBar = new HealthBar(
      this,
      this.player,
      10,
      10,
      this.sys.game.canvas.width,
      100
    );

    // These are temporary, just for demonstration
    this.waterDroplet = this.physics.add.sprite(
      this.sys.game.canvas.width / 4,
      0,
      "waterDroplet"
    );

    this.waterDroplet.setCollideWorldBounds(true);

    this.co2 = this.physics.add.sprite(
      this.sys.game.canvas.width - this.sys.game.canvas.width / 4,
      0,
      "co2"
    );

    this.co2.setCollideWorldBounds(true);

    this.sun = this.physics.add.sprite(
      this.sys.game.canvas.width * 0.6,
      0,
      "sun"
    );

    this.sun.setCollideWorldBounds(true);

    this.startTime = new Date().getTime();
    this.currentTime = this.startTime;
    this.displayTime = 0;

    this.timer = window.setInterval(() => {
      this.currentTime += 1000;

      const timeDiff = new Date(this.currentTime - this.startTime);

      this.displayTime = `${timeDiff.getMinutes}:${timeDiff.getSeconds}`;
    }, 1000);
  }

  async function update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const moveLeft = cursors.left.isDown;
    const moveRight = cursors.right.isDown;

    if (this.startHealth) {
      this.healthBar.updateValue();
    }

    if (moveLeft) {
      this.player.setVelocityX(calcMoveSpeed(this.sys.game.canvas.width, -1));
    }

    if (moveRight) {
      this.player.setVelocityX(calcMoveSpeed(this.sys.game.canvas.width));
    }

    if (!moveLeft && !moveRight) {
      this.player.setVelocityX(0);
    }
  }

  return game;
};

export default init;
