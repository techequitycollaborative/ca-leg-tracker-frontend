import { User } from "@/infrastructure/drizzle/schema/app-user";
import { IBaseRepository } from "./base.repository";

export interface IUser extends User {}

export interface IUserRepository extends IBaseRepository<IUser> {}