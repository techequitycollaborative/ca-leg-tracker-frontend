import { bill, Bill } from "@/infrastructure/drizzle/schema/bill";
import { billHistory, BillHistory } from "@/infrastructure/drizzle/schema/bill-history";
import { billSchedule, BillSchedule } from "@/infrastructure/drizzle/schema/bill-schedule";
import { user, User } from "@/infrastructure/drizzle/schema/app-user";
import { userAction, UserAction } from "@/infrastructure/drizzle/schema/user-action";
import { discussionComment, DiscussionComment } from "@/infrastructure/drizzle/schema/discussion-comment";
import { billLatestActions, BillLatestActions } from "@/infrastructure/drizzle/schema/views/bill-latest-actions";
import { billDashboard, BillDashboard } from "@/infrastructure/drizzle/schema/bill-dashboard";
import { billDetails, BillDetails } from "@/infrastructure/drizzle/schema/bill-details";
import { orgPosition, OrgPosition } from "@/infrastructure/drizzle/schema/org-position";
import { billIssue, BillIssue } from "@/infrastructure/drizzle/schema/bill-issue";
import { issue, Issue } from "@/infrastructure/drizzle/schema/issue";
import { billCommunitySponsor, BillCommunitySponsor } from "@/infrastructure/drizzle/schema/bill-community-sponsor";
import { communityOrg, CommunityOrg } from "@/infrastructure/drizzle/schema/community-org";

import { BaseRepository } from "./base.repository";
import { IBill, IBillRepository } from "definitions/bill.repository";
import { db } from "@/infrastructure/drizzle";
import { desc, eq, sql, and } from 'drizzle-orm';

  export interface EnrichedBill {
    bill: Bill;
    billDetails: BillDetails;
    billLatest: BillLatestActions;
    orgPosition: OrgPosition;
    assignedUser: User;
  }

  export class BillRepository
    extends BaseRepository<IBill>
    implements IBillRepository
  {
    constructor() {
      super(bill, 'billId');
    }

    public async listEnrichedBills(dashboardId: number): Promise<EnrichedBill[] | null>  {
      const itemsData = (await db
        .select({
          bill: bill,
          billDetails: billDetails,
          billLatest: billLatestActions,
          orgPosition: orgPosition,
          assignedUser: user
        })
        .from(this.table)
        .innerJoin(billDashboard, eq(billDashboard.billId, bill.billId))
        .leftJoin(billDetails, eq(billDetails.billDashboardId, billDashboard.billDashboardId))
        .leftJoin(billLatestActions, and(eq(billLatestActions.billId, bill.billId), eq(billLatestActions.dashboardId, dashboardId)))
        .leftJoin(orgPosition, eq(billDetails.orgPositionId, orgPosition.orgPositionId))
        .leftJoin(user, eq(billDetails.assignedUserId, user.userId))
        .where(eq(billDashboard.dashboardId, dashboardId))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getEnrichedBillById(billId: number, dashboardId: number): Promise<EnrichedBill | null> {
      const item = (await db
        .select({
          bill: bill,
          billDetails: billDetails,
          billLatest: billLatestActions,
          orgPosition: orgPosition,
          assignedUser: user
        })
        .from(this.table)
        .innerJoin(billDashboard, eq(billDashboard.billId, bill.billId))
        .leftJoin(billDetails, eq(billDetails.billDashboardId, billDashboard.billDashboardId))
        .leftJoin(billLatestActions, and(eq(billLatestActions.billId, bill.billId), eq(billLatestActions.dashboardId, dashboardId)))
        .leftJoin(orgPosition, eq(billDetails.orgPositionId, orgPosition.orgPositionId))
        .leftJoin(user, eq(billDetails.assignedUserId, user.userId))
        .where(and(eq(billDashboard.dashboardId, dashboardId), eq(bill.billId, billId)))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!item || !item.length || item.length <= 0) {
        return null;
      }
      return item[0];
    }

    public async getBillHistoryByBillId(billId: number): Promise<BillHistory[] | null> {
      const itemsData = (await db
        .select()
        .from(billHistory)
        .where(eq(billHistory.billId, billId))
        .orderBy(desc(billHistory.entryDate))
        .catch((e) => {
          console.log(e);
        })) as BillHistory[] | null;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getBillScheduleByBillId(billId: number): Promise<BillSchedule[] | null> {
      const itemsData = (await db
        .select()
        .from(billSchedule)
        .where(eq(billSchedule.billId, billId))
        .orderBy(desc(billSchedule.eventDate))
        .catch((e) => {
          console.log(e);
        })) as BillSchedule[] | null;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }
    
    public async getBillActions(billId: number, dashboardId: number): Promise<UserAction[] | null> {
      const itemsData = (await db
        .select()
        .from(userAction)
        .innerJoin(billDashboard, eq(billDashboard.billDashboardId, userAction.billDashboardId))
        .where(and(eq(billDashboard.dashboardId, dashboardId), eq(billDashboard.billId, billId)))
        .orderBy(desc(userAction.date))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getBillDiscussion(billId: number, dashboardId: number): Promise<DiscussionComment[] | null> {
      const itemsData = (await db
        .select()
        .from(discussionComment)
        .innerJoin(billDashboard, eq(billDashboard.billDashboardId, discussionComment.billDashboardId))
        .innerJoin(user, eq(discussionComment.userId, user.userId))
        .where(and(eq(billDashboard.dashboardId, dashboardId), eq(billDashboard.billId, billId)))
        .orderBy(desc(discussionComment.commentDatetime))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getIssues(billId: number, dashboardId: number): Promise<Issue[] | null> {
      const itemsData = (await db
        .select({issue: issue})
        .from(billIssue)
        .innerJoin(billDetails, eq(billIssue.billDetailsId, billDetails.billDetailsId))
        .innerJoin(billDashboard, eq(billDashboard.billDashboardId, billDetails.billDashboardId))
        .innerJoin(issue, eq(billIssue.issueId, issue.issueId))
        .where(and(eq(billDashboard.dashboardId, dashboardId), eq(billDashboard.billId, billId)))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getCommunitySponsors(billId: number, dashboardId: number): Promise<CommunityOrg[] | null> {
      const itemsData = (await db
        .select({sponsor: communityOrg})
        .from(billCommunitySponsor)
        .innerJoin(billDetails, eq(billCommunitySponsor.billDetailsId, billDetails.billDetailsId))
        .innerJoin(billDashboard, eq(billDashboard.billDashboardId, billDetails.billDashboardId))
        .innerJoin(communityOrg, eq(communityOrg.communityOrgId, billCommunitySponsor.communityOrgId))
        .where(and(eq(billDashboard.dashboardId, dashboardId), eq(billDashboard.billId, billId)))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }
  }
