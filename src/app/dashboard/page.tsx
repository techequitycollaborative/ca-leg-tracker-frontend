import ListNav from '@/components/list-nav';
import { DashboardListItem } from '@/components/list-item';

import { IBillRepository } from '@/definitions/bill.repository';
import { repositories } from '@/repositories/index';

const Page = async ({}) => {
  const dashboardId = 1; // update to pull from session
  const bills = await repositories.billRepository.listEnrichedBills(dashboardId);

  return (
    <>
      <div>
        <ListNav />
        <div className="m-2">
          {bills &&
            bills.map((x: any, i: any) => (
              <div key={i}>
                <DashboardListItem
                  billId={x.bill.billId}
                  billNumber={x.bill.billNumber}
                  billName={x.bill.billName}
                  billCustomName={x.billDetails == null ? x.bill.billName : x.billDetails.alternateName}
                  billLatest={x.billLatest.lastText}
                  billUpcoming={x.billLatest.nextText}
                  billLastAction={x.billLatest.userText}
                  billSession={x.bill.legSession}
                  billPosition={x.orgPosition == null ? "Unknown" : x.orgPosition.orgPositionName}
                  billIssues="[issues]"
                  billCommittee="[committee]"
                  billLink={x.bill.leginfoLink}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
