export default class InvalidData extends Error {
    constructor(message: string) {
      super(`${message}`);
  
      this.name = "InvalidData";
      Object.setPrototypeOf(this, InvalidData.prototype);
    }
  }