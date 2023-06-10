class Player {
  _width = 40;
  _height = 40;
  _color = "#0000cc";
  _tailColor = "#00ffff";
  _pos = { x: 0, y: 0 };
  _dir = { x: 1, y: 0 };
  _tail = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ];
  n = 0;

  spawn() {
    this._tail.forEach((tail, idx) => {
      ctx.fillStyle = this._tailColor;

      ctx.fillRect(
        tail.x - (idx * this._width  * this._dir.x),
        tail.y - (idx * this._height * this._dir.y),
        this._width,
        this._height
      );
    });

    ctx.fillStyle = this._color;
    ctx.fillRect(this._pos.x, this._pos.y, this._width, this._height);
  }

  update() {
    if (this._dir.x !== 0) this.isPeakX(); else
    if (this._dir.y !== 0) this.isPeakY();

    const prev = this.move();
    this.clearPrevious(prev);

    this._tail.unshift({ ...this._pos });
    this._tail.pop();

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
