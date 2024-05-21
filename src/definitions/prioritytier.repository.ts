import { CommunityOrg } from "@/infrastructure/drizzle/schema/priority-tier";
import { IBaseRepository } from "./base.repository";

export interface IPriorityTier extends PriorityTier {}

export interface IPriorityTierRepository extends IBaseRepository<IPriorityTier> {}