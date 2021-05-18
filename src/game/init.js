import Phaser from "phaser";
import HealthBar from "./health";
import { Mob } from "./mobs";
import Player from "./player";

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
    const sprites = new Map([
      ["player1", "./sprites/player-1.png"],
      ["player2", "./sprites/player-2.png"],
      ["player3", "./sprites/player-3.png"],
      ["waterDroplet", "./sprites/water-droplet.png"],
      ["co2", "./sprites/co2.png"],
      ["sun", "./sprites/sun.png"],
    ]);

    sprites.forEach((path, name) => {
      this.load.image(name, path);
    });
  }

  async function create() {
    this.player = new Player(
      this,
      this.sys.game.canvas.width / 2,
      this.sys.game.canvas.height / 2,
      "player1"
    );

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

    this.waterDroplet = new Mob(this, "waterDroplet", this.healthBar, 20);
    this.co2 = new Mob(this, "co2", this.healthBar, 20);
    this.sun = new Mob(this, "sun", this.healthBar, 20);

    this.startTime = new Date().getTime();
    this.currentTime = this.startTime;
    this.displayTime = 0;

    this.timer = window.setInterval(() => {
      this.currentTime += 1000;

      const timeDiff = new Date(this.currentTime - this.startTime);

      this.displayTime = `${formatTime(timeDiff.getMinutes())}:${formatTime(
        timeDiff.getSeconds()
      )}`;
    }, 1000);
  }

  async function update() {
    if (this.startHealth) {
      this.healthBar.updateValue();
    }

    this.player.move(
      this.sys.game.canvas.width,
      this.input.keyboard.createCursorKeys()
    );
  }

  return game;
};

const formatTime = (num) => {
  return num < 10 ? "0" + num : num;
};

export default init;
