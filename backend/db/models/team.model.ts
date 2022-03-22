import { ObjectId } from "mongodb";
import User from "./user.model";
import Bug from './bug.model';

export default class Team {
  constructor(
    public name: string, 
    public description: string, 
    public belongsTo: User,
    public users: User[],
    public cards: Bug[],
    public date?: Date,
    public _id?: ObjectId) {
      this.date = new Date();
    }
}