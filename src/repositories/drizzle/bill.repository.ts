import { bill } from "@/infrastructure/drizzle/schema/bill";
import { billHistory, BillHistory } from "@/infrastructure/drizzle/schema/bill-history";
import { billSchedule, BillSchedule } from "@/infrastructure/drizzle/schema/bill-schedule";
import { BaseRepository } from "./base.repository";
import { IBill, IBillRepository } from "definitions/bill.repository";
import { db } from "@/infrastructure/drizzle";
import { eq, sql } from 'drizzle-orm';

  
  export class BillRepository
    extends BaseRepository<IBill>
    implements IBillRepository
  {
    constructor() {
      super(bill, 'billId');
    }

    public async getBillHistoryByBillId(primaryKey: number): Promise<BillHistory[] | null> {
      const itemsData = (await db
        .select()
        .from(billHistory)
        .where(eq(billHistory.billId, primaryKey))
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
        .catch((e) => {
          console.log(e);
        })) as BillSchedule[] | null;

      if (!itemsData || itemsData.length < 1) {
        return null;
      }
      return itemsData
    }
    
  }