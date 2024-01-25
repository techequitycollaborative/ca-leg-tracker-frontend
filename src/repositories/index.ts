import { BillRepository } from "./drizzle/bill.repository";
import { DashboardRepository } from "./drizzle/dashboard.repository";
import { CommitteeRepository } from "./drizzle/committee.repository";
import { CommunityOrgRepository } from "./drizzle/communityorg.repository";
import { IssueRepository } from "./drizzle/issue.repository";
import { LegislatorRepository } from "./drizzle/legislator.repository";
import { OrgPositionRepository } from "./drizzle/orgposition.repository";
import { UserRepository } from "./drizzle/user.repository";
import { UserActionTypeRepository } from "./drizzle/useractiontype.repository";
import { UserActionStatusRepository } from "./drizzle/useractionstatus.repository";


export const repositories = {
    billRepository: new BillRepository(),
    committeeRepository: new CommitteeRepository(),
    communityOrgRepository: new CommunityOrgRepository(),
    dashboardRepository: new DashboardRepository(),
    issueRepository: new IssueRepository(),
    legislatorRepository: new LegislatorRepository(),
    orgPositionRepository: new OrgPositionRepository(),
    userRepository: new UserRepository(),
    userActionTypeRepository: new UserActionTypeRepository(),
    userActionStatusRepository: new UserActionStatusRepository(),
}