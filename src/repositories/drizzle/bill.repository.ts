import { bill, Bill } from "@/infrastructure/drizzle/schema/bill";
import { billHistory, BillHistory } from "@/infrastructure/drizzle/schema/bill-history";
import { billSchedule, BillSchedule } from "@/infrastructure/drizzle/schema/bill-schedule";
import { billLatestActions, BillLatestActions } from "@/infrastructure/drizzle/schema/bill-latest-actions";
import { BaseRepository } from "./base.repository";
import { IBill, IBillRepository } from "definitions/bill.repository";
import { db } from "@/infrastructure/drizzle";
import { desc, eq, sql } from 'drizzle-orm';

  export interface EnrichedBill {
    bill: Bill;
    bill_latest_actions: BillLatestActions;
  }
  
  export class BillRepository
    extends BaseRepository<IBill>
    implements IBillRepository
  {
    constructor() {
      super(bill, 'billId');
    }

    public async billsWithContext(): Promise<EnrichedBill[] | null> {
      const itemsData = (await db
        .select()
        .from(this.table)
        .leftJoin(billLatestActions, eq(billLatestActions.billId, bill.billId))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getBillHistoryByBillId(primaryKey: number): Promise<BillHistory[] | null> {
      const itemsData = (await db
        .select()
        .from(billHistory)
        .where(eq(billHistory.billId, primaryKey))
        .orderBy(desc(billHistory.entryDate))
        .catch((e) => {
          console.log(e);
        })) as BillHistory[] | null;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }

    public async getBillScheduleByBillId(primaryKey: number): Promise<BillSchedule[] | null> {
      const itemsData = (await db
        .select()
        .from(billSchedule)
        .where(eq(billSchedule.billId, primaryKey))
        .orderBy(desc(billSchedule.eventDate))
        .catch((e) => {
          console.log(e);
        })) as BillSchedule[] | null;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }
    
  }