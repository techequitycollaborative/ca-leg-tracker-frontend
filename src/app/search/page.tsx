import ListSearchBar from '@/components/list-search-bar'
import ListNav from '@/components/list-nav';
import { ListItem } from '@/components/list-item';

import { IBillRepository } from '@/definitions/bill.repository';
import { repositories } from '@/repositories/index';
import { addBillToDashboard } from 'app/actions';
import { getDashboard } from 'lib/session';

const Page = async ({ searchParams }: any) => {
  const dashboard = await getDashboard();
  const searchTerms = searchParams?.s as string;
  let bills = await repositories.billRepository.searchBillsWithDashboardStatus(dashboard.dashboardId, searchTerms, 100);

  return (
    <>
      <div>
        <ListSearchBar
          searchTerms={searchTerms}
        />
        {/* bill sort and filters */}
        <div className="m-2">
          {bills &&
            bills.map((x: any, i: any) => (
              <div key={i}>
                <ListItem
                  dashboard={dashboard}
                  billId={x.bill.billId}
                  billNumber={x.bill.billNumber}
                  billName={x.bill.billName}
                  billAuthor={x.bill.author}
                  billLink={x.bill.leginfoLink}
                  billExcerpt={x.bill.fullText?.slice(0,300).replace(/\\n/g, ' ') + ' ...'}
                  billSession={x.bill.legSession}
                  billIsTracked={x.dashboardId ? true : false}
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
