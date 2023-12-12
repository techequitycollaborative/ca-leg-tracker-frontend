import ListSearchBar from '@/components/list-search-bar'
import ListNav from '@/components/list-nav';
import { ListItem } from '@/components/list-item';

import { IBillRepository } from '@/definitions/bill.repository';
import { repositories } from '@/repositories/index';

const Page = async ({}) => {
  const bills = (await repositories.billRepository.list({ limit: 20 })) as
    | IBillRepository[]
    | null;

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
                  billId={x.billId}
                  billNumber={x.billNumber}
                  billName={x.billName}
                  billLatest="[last update]"
                  billSession="[session name]"
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
