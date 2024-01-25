import { communityOrg } from "@/infrastructure/drizzle/schema/community-org";
import { BaseRepository } from "./base.repository";
import { ICommunityOrg, ICommunityOrgRepository } from "definitions/communityorg.repository";
import { db } from "@/infrastructure/drizzle";

  
  export class CommunityOrgRepository
    extends BaseRepository<ICommunityOrg>
    implements ICommunityOrgRepository
  {
    constructor() {
      super(communityOrg, 'communityOrgId');
    }
    
  }