class Player extends GameObject {
  /**
   * @var _width      int
   * @var _height     int
   * @var _color      string
   * @var _tailColor  string
   * @var _pos   object<axis: string, value: int>
   * @var _dir   object<axis: string, value: int>
   * @var _tail  array <axis: string, value: int>
   */
  _width = 40;
  _height = 40;
  _color = "#0000cc";
  _tailColor = "#00ffff";
  _pos = { x: 0, y: 0 };
  _dir = { x: 1, y: 0 };
  _tail = [ {}, {}, {} ];

  /**
   * Render player's body.
   */
  spawn() {
    // Snake's body & tail
    ctx.fillStyle = this._tailColor;
    this._tail.forEach((tail, idx) => {

      const distance = {
        x: (idx + 1) * this._width,
        y: (idx + 1) * this._height,
      };

      ctx.fillRect(
        tail.x - (distance.x  * this._dir.x),
        tail.y - (distance.y  * this._dir.y),
        this._width,
        this._height
      );
    });

    // Snake's head
    ctx.fillStyle = this._color;
    ctx.fillRect(this._pos.x, this._pos.y, this._width, this._height);
  }

  /**
   * Update player's view in each frame.
   *
   * 1. Move player and clear canvas (around player).
   * 2. Move player to other side when they reach peak of map.
   * 3. Update player's tail length.
   * 4. Render player.
   */
  update() {
    this.move();
    this.clearPrevious();

    if (this._dir.x !== 0) this.isPeakX(); else
    if (this._dir.y !== 0) this.isPeakY();

    this._tail.unshift({ ...this._pos });
    this._tail.pop();

    this.spawn();
  }

  /**
   * Move player to other horizontal side when they reach horizontal peak of map.
   */
  isPeakX() {
    if (this._pos.x < 0) {
      this._pos.x = WORLD.peak.x - this._width;
    } else if (this._pos.x + this._width > WORLD.peak.x) {
      this._pos.x = 0;
    }
  }

  /**
   * Move player to other vertical side when they reach vertical peak of map.
   */
  isPeakY() {
    if (this._pos.y < 0) {
      this._pos.y = WORLD.peak.y - this._height;
    } else if (this._pos.y + this._height > WORLD.peak.y) {
      this._pos.y = 0;
    }
  }

  move() {
    // const currPos = {
      // x: this._pos.x,
      // y: this._pos.y,
    // };

    this._pos.x += SPEED * this._dir.x;
    this._pos.y += SPEED * this._dir.y;

    // return currPos;
  }

  clearPrevious(pos=undefined) {
    // ctx.clearRect(this._pos.x - 40, this._pos.y - 40, this._width + 80, this._height + 80);
    ctx.clearRect(0, 0, main.width, main.height);
  }
}
