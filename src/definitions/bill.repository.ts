import { Bill } from "@/infrastructure/drizzle/schema/bill";
import { IBaseRepository } from "./base.repository";

export interface IBill extends Bill {}
export interface IPartialBill extends Partial<IBill> {}

export interface IBillRepository extends IBaseRepository<IBill> {}