import Phaser from "phaser";
import { calcMoveSpeed } from "./math";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.alive = true;

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);

    scene.physics.world.enableBody(this, 0);

    this.setCollideWorldBounds(true);
    console.log(this);
  }

  move(width, cursors) {
    let velocity = 0;

    if (cursors.right.isDown) {
      velocity = 1;
    }

    if (cursors.left.isDown) {
      velocity = -1;
    }

    if (this.alive) {
      return this.setVelocityX(calcMoveSpeed(width, velocity));
    }

    if (!this.alive) {
      return this.setVelocityX(0);
    }
  }

  die() {
    this.alive = false;
  }
}
