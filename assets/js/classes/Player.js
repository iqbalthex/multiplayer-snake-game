class Player {
  _width = 40;
  _height = 40;
  _color = "#0000cc";
  _pos = { x: 0, y: 0 };
  _dir = { x: 1, y: 0 };

  spawn() {
    ctx.fillStyle = this._color;
    ctx.fillRect(this._pos.x, this._pos.y, this._width, this._height);
  }

  update() {
    if (this._dir.x !== 0) this.isPeakX(); else
    if (this._dir.y !== 0) this.isPeakY();

    const prev = this.move();
    this.clearPrevious(prev);

    this.spawn();
  }

  isPeakX() {
    if (this._pos.x < 0) {
      this._pos.x = WORLD.peak.x - this._width;
    } else if (this._pos.x + this._width > WORLD.peak.x) {
      this._pos.x = 0;
    }
  }

  isPeakY() {
    if (this._pos.y < 0) {
      this._pos.y = WORLD.peak.y - this._height;
    } else if (this._pos.y + this._height > WORLD.peak.y) {
      this._pos.y = 0;
    }
  }

  move() {
    const currPos = {
      x: this._pos.x,
      y: this._pos.y,
    };

    this._pos.x += SPEED * this._dir.x;
    this._pos.y += SPEED * this._dir.y;

    return currPos;
  }

  get side() {
    return {
      left  : this._pos.x,
      top   : this._pos.y,
      right : this._pos.x + this._width,
      bottom: this._pos.y + this._height
    };
  }

  clearPrevious(pos) {
    // ctx.clearRect(this._pos.x - 40, this._pos.y - 40, this._width + 80, this._height + 80);
    ctx.clearRect(0, 0, main.width, main.height);
  }
}
