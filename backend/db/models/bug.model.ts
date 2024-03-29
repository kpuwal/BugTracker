import { ObjectId } from "mongodb";
import User from "./user.model";
import Status from './status.model';

export default class Bug {
  constructor(
    public title: string, 
    public description: string,
    public createdBy: string,
    public status: Status,
    public category?: string,
    public workedOnBy?: User[],
    public date?: Date,
    public _id?: ObjectId) {
      this.date = new Date();
    }
}