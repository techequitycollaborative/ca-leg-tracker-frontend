import { NextPage } from 'next';
import { Button } from '@/components/ui/button';

interface Props {
  billId: number;
  billNumber: string;
  billName: string;
  billLatest: string;
  billSession: string;
}

interface ListItemProps extends Props {
  billAdd: string;
}

interface DashboardListItemProps extends Props {
  billCustomName: string;
  billPosition: string;
  billIssues: string;
  billCommittee: string;
  billLink: string;
  billLastAction: string;
  billUpcoming: string;
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
          <Button>+ Add to dashboard</Button>
        </div>
      </div>
    </a>
  );
};

export const DashboardListItem: NextPage<DashboardListItemProps> = function DashboardListItem(props) {
  return (
    <a href={'/bill/' + props.billId + '/details'}>
      <div className="border border-gray-500 rounded-xl p-4 m-2 flex">
        <div>
          <p><span className="font-bold">{props.billNumber}</span> {props.billCustomName}</p>
          <p>{props.billLink} | {props.billSession}</p>
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
        <div className="ml-auto">
          <p>Tracking in: [dashboard name]</p>
          <Button>Remove</Button>
        </div>
      </div>
    </a>
  );
};
