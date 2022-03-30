const { v4: uuidv4 } = require('uuid');
import User from './user.model';

export default class RefreshToken {
  constructor(
    public token: string,
    public user: User,
    public expiryDate: Date,

  ) {}

  async createToken(user: User) {
    const tokenId = uuidv4();
    const expireAt = new Date
  }
}