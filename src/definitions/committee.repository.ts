import { Committee } from "@/infrastructure/drizzle/schema/committee";
import { IBaseRepository } from "./base.repository";

export interface ICommittee extends Committee {}

export interface ICommitteeRepository extends IBaseRepository<ICommittee> {}