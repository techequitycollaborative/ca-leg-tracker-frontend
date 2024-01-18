import { Issue } from "@/infrastructure/drizzle/schema/issue";
import { IBaseRepository } from "./base.repository";

export interface IIssue extends Issue {}

export interface IIssueRepository extends IBaseRepository<IIssue> {}