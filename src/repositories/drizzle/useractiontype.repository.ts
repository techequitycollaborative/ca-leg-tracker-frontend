import { BaseRepository } from "./base.repository";
import { db } from "@/infrastructure/drizzle";
import { IUserActionType, IUserActionTypeRepository } from "definitions/useractiontype.repository";
import { userActionType } from "@/infrastructure/drizzle/schema/user-action-type";

  
  export class UserActionTypeRepository
    extends BaseRepository<IUserActionType>
    implements IUserActionTypeRepository
  {
    constructor() {
      super(userActionType, 'userActionTypeId');
    }
    
  }