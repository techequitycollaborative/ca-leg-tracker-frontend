import { OrgPosition } from "@/infrastructure/drizzle/schema/org-position";
import { IBaseRepository } from "./base.repository";

export interface IOrgPosition extends OrgPosition {}

export interface IOrgPositionRepository extends IBaseRepository<IOrgPosition> {}