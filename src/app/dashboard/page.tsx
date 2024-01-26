import ListNav from '@/components/list-nav';
import { DashboardListItem } from '@/components/list-item';

import { IBillRepository } from '@/definitions/bill.repository';
import { repositories } from '@/repositories/index';
import { removeBillFromDashboard } from 'app/actions';
import { getDashboard } from 'lib/session';

const Page = async ({}) => {
  const dashboard = await getDashboard();
  const bills = await repositories.billRepository.listEnrichedBills(dashboard.dashboardId);

  return (
    <>
      <div>
        {/* bill sort and filters */}
        <div className="m-2">
          {bills &&
            bills.map((x: any, i: any) => (
              <div key={i}>
                <DashboardListItem
                  dashboard={dashboard}
                  billId={x.bill.billId}
                  billNumber={x.bill.billNumber}
                  billName={x.bill.billName}
                  billCustomName={x.billDetails == null ? x.bill.billName : x.billDetails.alternateName}
                  billLatest={x.billLatest.lastText}
                  billUpcoming={x.billLatest.nextText}
                  billLastAction={x.billLatest.userText}
                  billSession={x.bill.legSession}
                  billPosition={x.orgPosition?.orgPositionName}
                  billCommittee={x.committee?.name}
                  billLink={x.bill.leginfoLink}
                  billRemove={removeBillFromDashboard}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
