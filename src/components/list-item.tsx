import { NextPage } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { BillDashboardAdd, BillDashboardRemove } from '@/components/forms/dashboard-toggle';

interface Props {
  dashboardId: number;
  billId: number;
  billNumber: string;
  billName: string;
  billLatest: string;
  billSession: string;
}

interface ListItemProps extends Props {
  billAdd: (formData: FormData) => Promise<void>;
}

interface DashboardListItemProps extends Props {
  billCustomName: string;
  billPosition: string;
  billIssues: string;
  billCommittee: string;
  billLink: string;
  billLastAction: string;
  billUpcoming: string;
  billRemove: (formData: FormData) => Promise<void>;
}

export const ListItem: NextPage<ListItemProps> = function ListItem(props) {
  return (
    <a href={'/bill/' + props.billId + '/details'}>
      <div className="border border-gray-500 rounded-xl p-4 m-2 flex">
        <div>
          <p><span className="font-bold">{props.billNumber}</span> {props.billName}</p>
          <p className="text-sm text-gray-600"><span className="uppercase">Latest</span> {props.billLatest}</p>
        </div>
        <div className="ml-auto">
          <p>{props.billSession}</p>
          <BillDashboardAdd
            submit={props.billAdd}
            dashboardId={props.dashboardId}
            billId={props.billId}
          />
        </div>
      </div>
    </a>
  );
};

export const DashboardListItem: NextPage<DashboardListItemProps> = function DashboardListItem(props) {
  return (
    <div className="relative">
      <a className="absolute left-0 top-0 bottom-0 right-0" href={'/bill/' + props.billId + '/details'}></a>
      <div className="border border-gray-500 rounded-xl p-4 m-2 flex">
        <div>
          <p><span className="font-bold">{props.billNumber}</span> {props.billCustomName}</p>
          <div className="flex">
            <p className="text-blue-lighter z-10 hover:opacity-70">
              <a href={props.billLink} target="_blank" title={props.billNumber}>
                {props.billNumber} <Image className="inline mb-1" src="/link.svg" alt="Link" width={14} height={14} />
              </a>
            </p>
            <p className="mx-2">|</p>
            <p>{props.billSession}</p>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600"><span className="font-bold">Most recent activity:</span> {props.billLatest}</p>
            <p className="text-sm text-gray-600"><span className="font-bold">Upcoming activity:</span> {props.billUpcoming}</p>
            <p className="text-sm text-gray-600"><span className="font-bold">Our last action:</span> {props.billLastAction}</p>
          </div>
          <div className="mt-2 flex">
            <p className="">Position: {props.billPosition}</p>
            <p className="ml-4">Issue area: {props.billIssues}</p>
            <p className="ml-4">Committee: {props.billCommittee}</p>
          </div>
        </div>
        <div className="ml-auto z-10 hover:opacity-70">
          <p>Tracking in: [dashboard name]</p>
          <BillDashboardRemove
            submit={props.billRemove}
            dashboardId={props.dashboardId}
            billId={props.billId}
          />
        </div>
      </div>
    </div>
  );
};
