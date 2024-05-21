import { bill, Bill } from "@/infrastructure/drizzle/schema/bill";
import { billHistory, BillHistory } from "@/infrastructure/drizzle/schema/bill-history";
import { billSchedule, BillSchedule } from "@/infrastructure/drizzle/schema/bill-schedule";
import { user, User } from "@/infrastructure/drizzle/schema/app-user";
import { userAction, UserAction } from "@/infrastructure/drizzle/schema/user-action";
import { userActionType, UserActionType } from "@/infrastructure/drizzle/schema/user-action-type";
import { userActionStatus, UserActionStatus } from "@/infrastructure/drizzle/schema/user-action-status";
import { discussionComment, DiscussionComment } from "@/infrastructure/drizzle/schema/discussion-comment";
import { billLatestActions, BillLatestActions } from "@/infrastructure/drizzle/schema/views/bill-latest-actions";
import { billDashboard, BillDashboard } from "@/infrastructure/drizzle/schema/bill-dashboard";
import { billDetails, BillDetails } from "@/infrastructure/drizzle/schema/bill-details";
import { orgPosition, OrgPosition } from "@/infrastructure/drizzle/schema/org-position";
import { billIssue, BillIssue } from "@/infrastructure/drizzle/schema/bill-issue";
import { issue, Issue } from "@/infrastructure/drizzle/schema/issue";
import { billPriority, BillPriority } from "@/infrastructure/drizzle/schema/bill-priority";
import { priorityTier, PriorityTier } from "@/infrastructure/drizzle/schema/priority-tier";
import { legislator, Legislator } from "@/infrastructure/drizzle/schema/legislator";
import { committee, Committee } from "@/infrastructure/drizzle/schema/committee";
import { chamberVoteResult, ChamberVoteResult } from "@/infrastructure/drizzle/schema/chamber-vote-result";
import { chamber, Chamber } from "@/infrastructure/drizzle/schema/chamber";

import { BaseRepository } from "./base.repository";
import { IBill, IBillRepository } from "definitions/bill.repository";
import { db } from "@/infrastructure/drizzle";
import { desc, eq, gt, sql, and, or, ilike } from 'drizzle-orm';

  export interface EnrichedBill {
    bill: Bill;
    billDetails: BillDetails;
    billLatest: BillLatestActions;
    orgPosition: OrgPosition;
    assignedUser: User;
    committee: Committee;
  }

  export class BillRepository
    extends BaseRepository<IBill>
    implements IBillRepository
  {
    constructor() {
      super(bill, 'billId');
    }



    // Bill lists

    public async listEnrichedBills(dashboardId: number): Promise<EnrichedBill[] | null>  {
      const itemsData = (await db
        .select({
          bill: bill,
          billDetails: billDetails,
          billLatest: billLatestActions,
          orgPosition: orgPosition,
          assignedUser: user,
          committee: committee
        })
        .from(this.table)
        .innerJoin(billDashboard, eq(billDashboard.billId, bill.billId))
        .leftJoin(billDetails, eq(billDetails.billDashboardId, billDashboard.billDashboardId))
        .leftJoin(billLatestActions, and(eq(billLatestActions.billId, bill.billId), eq(billLatestActions.dashboardId, dashboardId)))
        .leftJoin(orgPosition, eq(billDetails.orgPositionId, orgPosition.orgPositionId))
        .leftJoin(user, eq(billDetails.assignedUserId, user.userId))
        .leftJoin(committee, eq(bill.committeeId, committee.committeeId))
        .where(and(eq(billDashboard.dashboardId, dashboardId),eq(billDashboard.hidden, false)))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async searchBillsWithDashboardStatus(dashboardId: number, searchString: string | undefined, limit: number): Promise<Bill[] | null> {
      const dbSearchString = (searchString === undefined ? '%' : '%' + searchString + '%');

      const itemsData = (await db
        .select({
          bill: bill,
          dashboardId: billDashboard.dashboardId
        })
        .from(this.table)
        .leftJoin(billDashboard, and(eq(bill.billId, billDashboard.billId),eq(billDashboard.dashboardId, dashboardId),eq(billDashboard.hidden, false)))
        .where(or(ilike(bill.billNumber, dbSearchString),ilike(bill.fullText, dbSearchString),ilike(bill.author, dbSearchString),ilike(bill.billName, dbSearchString)))
        .orderBy(bill.billNumber)
        .limit(limit)
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getDashboardBillSchedule(dashboardId: number, startDate: string): Promise<BillSchedule[] | null> {
     const itemsData = (await db
        .select({
          billNumber: bill.billNumber,
          billSchedule: billSchedule
        })
        .from(billSchedule)
        .innerJoin(bill, eq(bill.billId, billSchedule.billId))
        .innerJoin(billDashboard, eq(bill.billId, billDashboard.billId))
        .where(and(eq(billDashboard.hidden, false),eq(billDashboard.dashboardId, dashboardId),gt(billSchedule.eventDate, startDate)))
        .orderBy(billSchedule.eventDate)
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getDashboardUserActions(dashboardId: number, startDate: string): Promise<UserAction[] | null> {
     const itemsData = (await db
        .select({
          billId: bill.billId,
          billNumber: bill.billNumber,
          text: userActionType.userActionTypeName,
          date: userAction.dueDate,
        })
        .from(userAction)
        .innerJoin(userActionType, eq(userAction.userActionTypeId, userActionType.userActionTypeId))
        .innerJoin(billDashboard, eq(userAction.billDashboardId, billDashboard.billDashboardId))
        .innerJoin(bill, eq(bill.billId, billDashboard.billId))
        .where(and(eq(billDashboard.hidden, false),eq(billDashboard.dashboardId, dashboardId),gt(userAction.dueDate, startDate)))
        .orderBy(userAction.dueDate)
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }


    // Single bill history, details, discussion, actions, and votes

    public async getEnrichedBillById(billId: number, dashboardId: number): Promise<EnrichedBill | null> {
      const item = (await db
        .select({
          bill: bill,
          billDetails: billDetails,
          billLatest: billLatestActions,
          orgPosition: orgPosition,
          assignedUser: user,
          committee: committee
        })
        .from(this.table)
        .innerJoin(billDashboard, eq(billDashboard.billId, bill.billId))
        .leftJoin(billDetails, eq(billDetails.billDashboardId, billDashboard.billDashboardId))
        .leftJoin(billLatestActions, and(eq(billLatestActions.billId, bill.billId), eq(billLatestActions.dashboardId, dashboardId)))
        .leftJoin(orgPosition, eq(billDetails.orgPositionId, orgPosition.orgPositionId))
        .leftJoin(user, eq(billDetails.assignedUserId, user.userId))
        .leftJoin(committee, eq(bill.committeeId, committee.committeeId))
        .where(and(eq(billDashboard.dashboardId, dashboardId), eq(bill.billId, billId)))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!item || !item.length || item.length <= 0) {
        return null;
      }
      return item[0];
    }

    public async getBillDashboard(billId: number, dashboardId: number): Promise<BillDashboard | null> {
      const item = (await db
        .select()
        .from(billDashboard)
        .where(and(eq(billDashboard.billId, billId),eq(billDashboard.dashboardId, dashboardId)))
        .catch((e) => {
          console.log(e);
        })) as any;
      
      if (!item || item.length < 1) {
        return null;
      }
      else {
        return item[0];
      }
    }

    public async getBillHistoryByBillId(billId: number): Promise<BillHistory[] | null> {
      const itemsData = (await db
        .select()
        .from(billHistory)
        .where(eq(billHistory.billId, billId))
        .orderBy(desc(billHistory.historyOrder))
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
        .orderBy(desc(billSchedule.eventDate),desc(billSchedule.billScheduleId))
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
        .select({
          userAction: userAction,
          userActionTypeName: userActionType.userActionTypeName,
          userActionStatusName: userActionStatus.userActionStatusName,
          legislatorName: legislator.name,
          committeeName: committee.name,
        } as any)
        .from(userAction)
        .innerJoin(billDashboard, eq(billDashboard.billDashboardId, userAction.billDashboardId))
        .innerJoin(userActionType, eq(userActionType.userActionTypeId, userAction.userActionTypeId))
        .innerJoin(userActionStatus, eq(userActionStatus.userActionStatusId, userAction.userActionStatusId))
        .leftJoin(user, eq(user.userId, userAction.userId))
        .leftJoin(legislator, eq(legislator.legislatorId, userAction.legislatorId))
        .leftJoin(committee, eq(committee.committeeId, userAction.committeeId))
        .where(and(eq(billDashboard.dashboardId, dashboardId), eq(billDashboard.billId, billId)))
        .orderBy(desc(userAction.dueDate))
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

    public async getBillIssues(billId: number, dashboardId: number): Promise<Issue[] | null> {
      const itemsData = (await db
        .select({issueId: issue.issueId, issueName: issue.issueName})
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

    public async getBillPriorityTier(billId: number, dashboardId: number): Promise<PriorityTier[] | null> {
      const itemsData = (await db
        .select({priorityId: priorityTier.priorityId, priorityDescription: priorityTier.priorityDescription})
        .from(billPriority)
        .innerJoin(billDetails, eq(billPriority.billDetailsId, billDetails.billDetailsId))
        .innerJoin(billDashboard, eq(billDashboard.billDashboardId, billDetails.billDashboardId))
        .innerJoin(priorityTier, eq(priorityTier.priorityId, billPriority.priorityId))
        .where(and(eq(billDashboard.dashboardId, dashboardId), eq(billDashboard.billId, billId)))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getBillVotes(billId: number): Promise<ChamberVoteResult[] | null> {
      const itemsData = (await db
        .select({
          vote: chamberVoteResult,
          chamber: chamber
        })
        .from(chamberVoteResult)
        .innerJoin(chamber, eq(chamber.chamberId, chamberVoteResult.chamberId))
        .where(eq(chamberVoteResult.billId, billId))
        .orderBy(desc(chamberVoteResult.voteDate))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }



    // Insert and update functions

    public async saveDiscussionComment(
      dashboardId: number,
      billId: number,
      userId: number,
      commentText: string
    ) {
      const item = (await db
        .select()
        .from(billDashboard)
        .where(and(eq(billDashboard.billId, billId), eq(billDashboard.dashboardId, dashboardId)))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!item || item.length < 1) {
        return null;
      }
      else {
        await db.insert(discussionComment).values({
          billDashboardId: item[0].billDashboardId,
          userId: userId,
          commentDatetime: new Date(),
          commentText: commentText
        } as any);
      }
    }

    public async saveUserAction(
      billDashboardId: number,
      userActionId: number | null,
      userActionTypeId: number,
      dueDate: string,
      userActionStatusId: number,
      legislatorId: number | null,
      committeeId: number | null,
      link: string | null,
      notes: string | null
    ) {
      const existingUserActionId = userActionId ? userActionId : -1; // Set to invalid ID if null

      const existingUserAction = (await db
        .select()
        .from(userAction)
        .where(eq(userAction.userActionId, existingUserActionId))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!existingUserAction || existingUserAction.length < 1) {
        // Add new
        await db.insert(userAction).values({
          billDashboardId: billDashboardId,
          userId: null,
          dueDate: dueDate,
          userActionTypeId: userActionTypeId,
          userActionStatusId: userActionStatusId,
          legislatorId: legislatorId,
          committeeId: committeeId,
          link: link,
          notes: notes
        } as any);
      }
      else {
        // Edit
        await db
          .update(userAction)
          .set({
            dueDate: dueDate,
            userActionTypeId: userActionTypeId,
            userActionStatusId: userActionStatusId,
            legislatorId: legislatorId,
            committeeId: committeeId,
            link: link,
            notes: notes
          })
          .where(eq(userAction.userActionId, existingUserActionId));
      }
    }

    public async saveBillDetails(
      billDetailsId: number,
      alternateName: string,
      assignedUserId: number | null,
      issueId: number | null,
      orgPositionId: number | null,
      priorityId: number | null,
      communitySponsor: string,
      coalition: string,
      politicalIntel: string,
      policyNotes: string
    ) {
      // Update the bill details.
      // Assumes a bill detail object has been created for any bill added to this dashboard.
      const existingBillDetails = (await db
        .select()
        .from(billDetails)
        .where(eq(billDetails.billDetailsId, billDetailsId))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!existingBillDetails || existingBillDetails.length < 1) {
        return null;
      }

      await db
        .update(billDetails)
        .set({
          alternateName: alternateName,
          assignedUserId: assignedUserId,
          orgPositionId: orgPositionId,
          communitySponsor: communitySponsor,
          coalition: coalition,
          politicalIntel: politicalIntel,
          policyNotes: policyNotes
        })
        .where(eq(billDetails.billDetailsId, billDetailsId));

      // Community sponsor left blank: delete from table if row already exists
      if (priorityId == null) {
        await db
          .delete(billPriority)
          .where(eq(billPriority.billDetailsId, billDetailsId))
          .catch((e) => {
            console.log(e);
          }) as any;
      }
      else {
        // Check if a community sponsor row exists. If so, update; else create.
        const existingPriorityTier = (await db
          .select()
          .from(billPriority)
          .where(eq(billPriority.billDetailsId, billDetailsId))
          .catch((e) => {
            console.log(e);
          })) as any;

        if (!existingPriorityTier || existingPriorityTier.length < 1) {
          await db.insert(billPriority).values({
            billDetailsId: billDetailsId,
            priorityId: priorityId
          } as any);
        }
        else {
          await db
            .update(billPriority)
            .set({
              priorityId: priorityId
            })
            .where(eq(billPriority.billPriorityId, existingPriorityTier[0].billPriorityId))
        }
      }

      // Issue left blank: delete from table if row already exists
      if (issueId == null) {
        await db
          .delete(billIssue)
          .where(eq(billIssue.billDetailsId, billDetailsId))
          .catch((e) => {
            console.log(e);
          }) as any;
      }
      else {
        // Check if a bill issue row exists. If so, update; else create.
        const existingIssue = (await db
          .select()
          .from(billIssue)
          .where(eq(billIssue.billDetailsId, billDetailsId))
          .catch((e) => {
            console.log(e);
          })) as any;

        if (!existingIssue || existingIssue.length < 1) {
          await db.insert(billIssue).values({
            billDetailsId: billDetailsId,
            issueId: issueId
          } as any);
        }
        else {
          await db
            .update(billIssue)
            .set({
              issueId: issueId
            })
            .where(eq(billIssue.billIssueId, existingIssue[0].billIssueId))
        }
      }
    }
  }
