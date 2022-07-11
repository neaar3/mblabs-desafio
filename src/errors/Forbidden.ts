export default class Forbidden extends Error {
    constructor(message: string) {
      super(`${message}`);
  
      this.name = "Forbidden";
      Object.setPrototypeOf(this, Forbidden.prototype);
    }
  }