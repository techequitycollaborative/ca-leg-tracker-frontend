import ListSearchBar from '@/components/list-search-bar'
import ListNav from '@/components/list-nav';
import { ListItem } from '@/components/list-item';

import { IBillRepository } from '@/definitions/bill.repository';
import { repositories } from '@/repositories/index';
import { addBillToDashboard } from 'app/actions';
import { getDashboard } from 'lib/session';

const Page = async ({}) => {
  const dashboard = await getDashboard();
  const bills = await repositories.billRepository.list({limit: 20});

  return (
    <>
      <div>
        <ListSearchBar />
        {/* bill sort and filters */}
        <div className="m-2">
          {bills &&
            bills.map((x: any, i: any) => (
              <div key={i}>
                <ListItem
                  dashboard={dashboard}
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
