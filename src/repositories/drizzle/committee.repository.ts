import { BaseRepository } from "./base.repository";
import { db } from "@/infrastructure/drizzle";
import { ICommittee, ICommitteeRepository } from "definitions/committee.repository";
import { committee } from "@/infrastructure/drizzle/schema/committee";

  
  export class CommitteeRepository
    extends BaseRepository<ICommittee>
    implements ICommitteeRepository
  {
    constructor() {
      super(committee, 'committeeId');
    }
    
  }