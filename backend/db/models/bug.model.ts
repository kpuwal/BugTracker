import { ObjectId } from "mongodb";

export default class Bug {
  constructor(
    public name: string, 
    public description: string, 
    public category: string, 
    public id?: ObjectId) {}
}