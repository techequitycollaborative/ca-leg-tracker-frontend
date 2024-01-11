import ListSearchBar from '@/components/list-search-bar'
import ListNav from '@/components/list-nav';
import { ListItem } from '@/components/list-item';

import { IBillRepository } from '@/definitions/bill.repository';
import { repositories } from '@/repositories/index';

const Page = async ({}) => {
  const bills = await repositories.billRepository.billsWithContext();

  return (
    <>
      <div>
        <ListSearchBar />
        <ListNav />
        <div className="m-2">
          {bills &&
            bills.map((x: any, i: any) => (
              <div key={i}>
                <ListItem
                  billId={x.bill.billId}
                  billNumber={x.bill.billNumber}
                  billName={x.bill.billName}
                  billLatest={x.bill_latest_actions.lastText}
                  billSession={x.bill.legSession}
                  billAdd="[add to dashboard fn]"
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
