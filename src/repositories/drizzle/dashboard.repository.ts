import { dashboard } from "@/infrastructure/drizzle/schema/dashboard";
import { BaseRepository } from "./base.repository";
import { IDashboard, IDashboardRepository } from "definitions/dashboard.repository";
import { billDashboard, BillDashboard } from "@/infrastructure/drizzle/schema/bill-dashboard";
import { billDetails, BillDetails } from "@/infrastructure/drizzle/schema/bill-details";
import { db } from "@/infrastructure/drizzle";
import { eq, and } from 'drizzle-orm';

  
  export class DashboardRepository
    extends BaseRepository<IDashboard>
    implements IDashboardRepository
  {
    constructor() {
      super(dashboard, 'dashboardId');
    }
    
    public async addBillToDashboard(
      dashboardId: number,
      billId: number
    ) {
      const item = (await db
        .select()
        .from(billDashboard)
        .where(and(eq(billDashboard.billId, billId), eq(billDashboard.dashboardId, dashboardId)))
        .catch((e) => {
          console.log(e);
        })) as any;

      if (!item || item.length < 1) {
        // If the bill has never been added to this dashboard, create bill_dashboard and bill_details rows.
        const billDashboardInsert = await db
          .insert(billDashboard)
          .values({
            dashboardId: dashboardId,
            billId: billId,
            hidden: false
          } as any)
          .returning({ billDashboardId: billDashboard.billDashboardId });

        await db.insert(billDetails).values({
          billDashboardId: billDashboardInsert[0].billDashboardId,
          alternateName: null,
          policyNotes: null,
          orgPositionId: null,
          politicalIntel: null,
          assignedUserId: null
        } as any);
      }
      else {
        // If the bill has previously been added to this dashboard, unhide it.
        await db
          .update(billDashboard)
          .set({
            hidden: false
          })
          .where(and(eq(billDashboard.billId, billId), eq(billDashboard.dashboardId, dashboardId)));
      }
    }

    public async removeBillFromDashboard(
      dashboardId: number,
      billId: number
    ) {
      // Hide rather than deleting dashboard-specific bill data.
      // This allows recovery of saved details if the bill is later added back to the dashboard.
      await db
        .update(billDashboard)
        .set({
          hidden: true
        })
        .where(and(eq(billDashboard.billId, billId), eq(billDashboard.dashboardId, dashboardId)));
    }
  }