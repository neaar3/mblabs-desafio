export default class Unauthorized extends Error {
    constructor(message: string) {
      super(`${message}`);
  
      this.name = "Unauthorized";
      Object.setPrototypeOf(this, Unauthorized.prototype);
    }
  }