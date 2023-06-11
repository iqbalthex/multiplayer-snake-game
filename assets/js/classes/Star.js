class Star extends GameObject {
  _width = 30;
  _height = 30;
  _color = "#cccc00";
  _pos = {
    x: Math.floor(Math.random() * main.width  / 40) * 40,
    y: Math.floor(Math.random() * main.height / 40) * 40,
  };

  spawn() {
    ctx.fillStyle = this._color;
    ctx.fillRect(
      this._pos.x + 5,
      this._pos.y + 5,
      this._width,
      this._height
    );
  }

  update() {
    this.spawn();
  }

  /**
   * Spawn with random position on map.
   */
  respawn() {
    this._pos = {
      x: Math.floor(Math.random() * main.width  / 40) * 40,
      y: Math.floor(Math.random() * main.height / 40) * 40,
    };
  }
}
