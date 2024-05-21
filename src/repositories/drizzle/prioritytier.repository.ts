import { priorityTier } from "@/infrastructure/drizzle/schema/priority-tier";
import { BaseRepository } from "./base.repository";
import { IPriorityTier, IPriorityTierRepository } from "definitions/prioritytier.repository";
import { db } from "@/infrastructure/drizzle";

  
  export class PriorityTierRepository
    extends BaseRepository<IPriorityTier>
    implements IPriorityTierRepository
  {
    constructor() {
      super(priorityTier, 'priorityId');
    }
    
  }