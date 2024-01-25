import { UserActionType } from "@/infrastructure/drizzle/schema/user-action-type";
import { IBaseRepository } from "./base.repository";

export interface IUserActionType extends UserActionType {}

export interface IUserActionTypeRepository extends IBaseRepository<IUserActionType> {}