import { user } from "@/infrastructure/drizzle/schema/app-user";
import { BaseRepository } from "./base.repository";
import { IUser, IUserRepository } from "definitions/user.repository";
import { db } from "@/infrastructure/drizzle";

  
  export class UserRepository
    extends BaseRepository<IUser>
    implements IUserRepository
  {
    constructor() {
      super(user, 'userId');
    }
    
  }