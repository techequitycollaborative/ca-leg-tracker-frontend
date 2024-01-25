import { BaseRepository } from "./base.repository";
import { db } from "@/infrastructure/drizzle";
import { ILegislator, ILegislatorRepository } from "definitions/legislator.repository";
import { legislator } from "@/infrastructure/drizzle/schema/legislator";

  
  export class LegislatorRepository
    extends BaseRepository<ILegislator>
    implements ILegislatorRepository
  {
    constructor() {
      super(legislator, 'legislatorId');
    }
    
  }