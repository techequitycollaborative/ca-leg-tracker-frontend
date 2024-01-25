import { BaseRepository } from "./base.repository";
import { db } from "@/infrastructure/drizzle";
import { IUserActionStatus, IUserActionStatusRepository } from "definitions/useractionstatus.repository";
import { userActionStatus } from "@/infrastructure/drizzle/schema/user-action-status";

  
  export class UserActionStatusRepository
    extends BaseRepository<IUserActionStatus>
    implements IUserActionStatusRepository
  {
    constructor() {
      super(userActionStatus, 'userActionStatusId');
    }
    
  }