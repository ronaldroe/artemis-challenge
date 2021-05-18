import Phaser from "phaser";

export default class HealthBar {
  constructor(scene, player, x, y, canvasWidth, value) {
    this.healthBar = new Phaser.GameObjects.Graphics(scene);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.barWidth = canvasWidth / 4;
    this.value = value;
    this.player = player;

    this.draw();
    this.scene.add.existing(this.healthBar);
  }

  draw() {
    this.healthBar.clear();

    this.healthBar.fillStyle(0xffffff);
    this.healthBar.fillRect(this.x, this.y, this.width / 4, 24);

    if (this.value === 0) {
      this.player.die();
    } else if (this.value < 20) {
      this.healthBar.fillStyle(0xff0000);
      this.player.setTexture("player3");
    } else if (this.value < 50) {
      this.healthBar.fillStyle(0xffff00);
      this.player.setTexture("player2");
    } else {
      this.healthBar.fillStyle(0x00ff00);
      this.player.setTexture("player1");
    }

    this.healthBar.fillRect(this.x, this.y, this.calcFill(), 24);
  }

  updateValue(val) {
    if (val) {
      this.value = val;
      this.draw();
      return this.value;
    }

    // const dropSpeed = this.scene.physics.world.fps * 10;
    const newVal = this.value - 0.25;
    this.value = newVal > 0 ? newVal : 0;

    this.draw();
    return this.value;
  }

  calcFill() {
    return this.barWidth * (this.value / 100);
  }
}
