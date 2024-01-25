import { issue } from "@/infrastructure/drizzle/schema/issue";
import { BaseRepository } from "./base.repository";
import { IIssue, IIssueRepository } from "definitions/issue.repository";
import { db } from "@/infrastructure/drizzle";

  
  export class IssueRepository
    extends BaseRepository<IIssue>
    implements IIssueRepository
  {
    constructor() {
      super(issue, 'issueId');
    }
    
  }