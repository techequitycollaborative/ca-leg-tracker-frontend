import ListSearchBar from '@/components/list-search-bar'
import ListNav from '@/components/list-nav';
import { ListItem } from '@/components/list-item';

import { IBillRepository } from '@/definitions/bill.repository';
import { repositories } from '@/repositories/index';
import { addBillToDashboard } from 'app/actions';
import { getDashboard } from 'lib/session';

const Page = async ({}) => {
  const dashboardId = (await getDashboard()).dashboardId;
  const bills = await repositories.billRepository.list({limit: 20});

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
                  dashboardId={dashboardId}
                  billId={x.billId}
                  billNumber={x.billNumber}
                  billName={x.billName}
                  billLatest="[last activity]"
                  billSession={x.legSession}
                  billAdd={addBillToDashboard}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
