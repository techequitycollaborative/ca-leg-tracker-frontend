import ListNav from '@/components/list-nav';
import { DashboardListItem } from '@/components/list-item';

import { IBillRepository } from '@/definitions/bill.repository';
import { repositories } from '@/repositories/index';

const Page = async ({}) => {
  const bills = await repositories.billRepository.billsWithContext();
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
                  billCustomName="[user inputted bill name]"
                  billLatest={x.bill_latest_actions.lastText}
                  billUpcoming={x.bill_latest_actions.nextText}
                  billLastAction="[last action]"
                  billSession={x.bill.legSession}
                  billPosition="[org position]"
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
