export default class NotFound extends Error {
    constructor(message: string) {
      super(`${message}`);
  
      this.name = "NotFound";
      Object.setPrototypeOf(this, NotFound.prototype);
    }
  }