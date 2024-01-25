import { orgPosition } from "@/infrastructure/drizzle/schema/org-position";
import { BaseRepository } from "./base.repository";
import { IOrgPosition, IOrgPositionRepository } from "definitions/orgposition.repository";
import { db } from "@/infrastructure/drizzle";

  
  export class OrgPositionRepository
    extends BaseRepository<IOrgPosition>
    implements IOrgPositionRepository
  {
    constructor() {
      super(orgPosition, 'orgPositionId');
    }
    
  }