import { ObjectId } from "mongodb";
import User from "./user.model";

export default class Bug {
  constructor(
    public name: string, 
    public description: string, 
    public category: string,
    public belongsTo: User,
    public date?: Date,
    public _id?: ObjectId) {
      this.date = new Date();
    }
}