import { UserActionStatus } from "@/infrastructure/drizzle/schema/user-action-status";
import { IBaseRepository } from "./base.repository";

export interface IUserActionStatus extends UserActionStatus {}

export interface IUserActionStatusRepository extends IBaseRepository<IUserActionStatus> {}