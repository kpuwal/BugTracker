// roles: ['admin', 'moderator', 'user']

export default class Role {
  constructor(
    public admin: boolean,
    public moderator: boolean,
    public user: boolean) {}
}