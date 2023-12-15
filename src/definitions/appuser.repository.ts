import { AppUser } from "@/infrastructure/drizzle/schema/appuser";
import { IBaseRepository } from "./base.repository";

export interface IAppUser extends AppUser {}

export interface IAppUserRepository extends IBaseRepository<IAppUser> {}