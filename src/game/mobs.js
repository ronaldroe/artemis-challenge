import Phaser from "phaser";
import { getRandomValue } from "./math";

export class Mob extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, texture, healthbar, value) {
    super(scene, getRandomValue(scene.sys.canvas.width), 0, texture);

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    scene.physics.world.enableBody(this, 0);

    this.setCollideWorldBounds(true);
    this.setGravityY(-400);
  }
}
