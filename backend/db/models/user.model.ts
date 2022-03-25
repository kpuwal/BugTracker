import { ObjectId } from "mongodb";
import Role from './role.model';
import Bug from './bug.model';

export default class User {
  constructor(
    public name: string,
    public email: string, 
    public password: string,
    public roles: Role[],
    public bugs?: Bug[],
    public id?: ObjectId) {}
}