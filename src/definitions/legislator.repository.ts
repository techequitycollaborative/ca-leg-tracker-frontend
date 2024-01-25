import { Legislator } from "@/infrastructure/drizzle/schema/legislator";
import { IBaseRepository } from "./base.repository";

export interface ILegislator extends Legislator {}
export interface IPartialLegislator extends Partial<ILegislator> {}

export interface ILegislatorRepository extends IBaseRepository<ILegislator> {}