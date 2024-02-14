import { user, User } from "@/infrastructure/drizzle/schema/app-user";
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

    public async list(): Promise<User[] | null> {
      const itemsData = (await db
          .select()
          .from(user)
          .orderBy(user.userName)
          .catch((e) => {
            console.log(e);
          })) as User[] | null;

        if (!itemsData || itemsData.length < 1) {
          return null;
        }
        return itemsData
    }
  }