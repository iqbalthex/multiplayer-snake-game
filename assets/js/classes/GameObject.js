class GameObject {
  /**
   * Return 4 side of object.
   */
  get side() {
    return {
      left  : this._pos.x,
      top   : this._pos.y,
      right : this._pos.x + this._width,
      bottom: this._pos.y + this._height
    };
  }
}