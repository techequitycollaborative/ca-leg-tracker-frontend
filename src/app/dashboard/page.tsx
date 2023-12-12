import ListNav from '@/components/list-nav';
import { DashboardListItem } from '@/components/list-item';

import { IBillRepository } from '@/definitions/bill.repository';
import { repositories } from '@/repositories/index';

const Page = async ({}) => {
  const bills = (await repositories.billRepository.list({ limit: 20 })) as
    | IBillRepository[]
    | null;

  return (
    <>
      <div>
        <ListNav />
        <div className="m-2">
          {bills &&
            bills.map((x: any, i: any) => (
              <div key={i}>
                <DashboardListItem
                  billId={x.billId}
                  billNumber={x.billNumber}
                  billName={x.billName}
                  billCustomName="[user inputted bill name]"
                  billLatest="[last update]"
                  billUpcoming="[next sched]"
                  billLastAction="[last action]"
                  billSession="[session name]"
                  billPosition="[org position]"
                  billIssues="[issues]"
                  billCommittee="[committee]"
                  billLink="[leginfo link]"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
