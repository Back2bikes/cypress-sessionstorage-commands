class SessionStorage {
  static get cypressCommands() {
    return [
      "clearSessionStorageSnapshot",
      "saveSessionStorage",
      "restoreSessionStorage",
      "setSessionStorage",
      "getSessionStorage",
      "removeSessionStorage"
    ];
  }

  constructor(sessionStorage) {
    this._sessionStorage = sessionStorage;
    this.clearSessionStorageSnapshot();
  }

  clearSessionStorageSnapshot() {
    this._snapshot = {};
  }

  saveSessionStorage() {
    this.clearSessionStorageSnapshot();
    Object.keys(this._sessionStorage).forEach(key => {
      this._snapshot[key] = this._sessionStorage.getItem(key);
    });
  }

  restoreSessionStorage() {
    this._sessionStorage.clear();
    Object.keys(this._snapshot).forEach(key => {
      this._sessionStorage.setItem(key, this._snapshot[key]);
    });
  }

  getSessionStorage(key) {
    return this._sessionStorage.getItem(key);
  }

  setSessionStorage(key, value) {
    return this._sessionStorage.setItem(key, value);
  }

  removeSessionStorage(key) {
    return this._sessionStorage.removeItem(key);
  }
}

module.exports = SessionStorage;
