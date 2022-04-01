import { ObjectId } from "mongodb";
import User from "./user.model";
import Status from './status.model';

export default class Bug {
  constructor(
    public name: string, 
    public description: string, 
    public category?: string,
    public createdBy?: User,
    public workedOnBy?: User[],
    public status?: Status,
    public date?: Date,
    public _id?: ObjectId) {
      this.date = new Date();
    }
}