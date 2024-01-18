import { CommunityOrg } from "@/infrastructure/drizzle/schema/community-org";
import { IBaseRepository } from "./base.repository";

export interface ICommunityOrg extends CommunityOrg {}

export interface ICommunityOrgRepository extends IBaseRepository<ICommunityOrg> {}