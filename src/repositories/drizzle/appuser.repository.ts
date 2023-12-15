import { appuser } from "@/infrastructure/drizzle/schema/appuser";
import { BaseRepository } from "./base.repository";
import { IAppUser, IAppUserRepository } from "definitions/appuser.repository";
import { db } from "@/infrastructure/drizzle";

  
  export class AppUserRepository
    extends BaseRepository<IAppUser>
    implements IAppUserRepository
  {
    constructor() {
      super(appuser, 'userId');
    }

  }