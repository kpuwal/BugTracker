import { ObjectId } from "mongodb";
import Role from './role.model';

export default class User {
  constructor(
    public name: string,
    public email: string, 
    public password: string,
    public role: Role,
    public id?: ObjectId) {}
}