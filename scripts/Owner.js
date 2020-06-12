class Owner {
  constructor() {
    this._ownerId = null;
  }

  get ownerId() {
    return this._ownerId;
  }

  set ownerId(value) {
    this._ownerId = value;
  }
}
