import ListSearchBar from '@/components/list-search-bar'
import ListNav from '@/components/list-nav';
import ListItem from '@/components/list-item';

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
        <div className="border-2 border-black p-4 m-4">
          <p>bill list</p>
          {bills &&
            bills.map((x: any, i: any) => (
              <div key={i}>
                <ListItem
                  billId={x.billId}
                  billNumber={x.billNumber}
                  billName={x.billName}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
