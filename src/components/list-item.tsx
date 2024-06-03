import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BillDashboardAdd, BillDashboardRemove } from '@/components/forms/dashboard-toggle';
import AccessControlledComponent from '@/components/access-controlled-component';

interface Props {
  dashboard: {dashboardId: number; dashboardName: string;};
  billId: number;
  billNumber: string;
  billName: string;
  billSession: string;
  billLink: string;
}

interface ListItemProps extends Props {
  billAdd: (formData: FormData) => Promise<void>;
  billAuthor: string;
  billExcerpt: string;
  billIsTracked: boolean;
}

interface DashboardListItemProps extends Props {
  billCustomName: string;
  billPosition: string | null;
  billLastAction: string;
  billLatest: string;
  billUpcoming: string;
  // billIssue: string;
  billAssignedTo: string;
  billRemove: (formData: FormData) => Promise<void>;
}

function billDashboardAdd(props: ListItemProps) {
  return (
    <BillDashboardAdd
      submit={props.billAdd}
      dashboardId={props.dashboard.dashboardId}
      billId={props.billId}
    />
  );
}

function billDashboardRemove(props: DashboardListItemProps) {
  return (
    <div className="text-right ml-2 hover:opacity-70">
      <BillDashboardRemove
        submit={props.billRemove}
        dashboardId={props.dashboard.dashboardId}
        billId={props.billId}
      />
    </div>
  );
}

export const ListItem: NextPage<ListItemProps> = function ListItem(props) {
  return (
    <div className="relative">
      {props.billIsTracked ? (
        <a className="absolute left-0 top-0 bottom-0 right-0" href={'/bill/' + props.billId + '/details'}></a>
        ) : (
        <></>
      )}
      <div className="border border-gray-500 rounded-xl p-4 m-2 flex">
        <div>
          <p><span className="font-bold">{props.billNumber}</span> {props.billName}</p>
          <div className="flex text-sm">
            <p className="text-blue-lighter z-10 hover:opacity-70">
              <Link href={props.billLink} target="_blank" title={props.billNumber}>
                {props.billNumber} <Image className="inline mb-1" src="/link.svg" alt="Link" width={14} height={14} />
              </Link>
            </p>
            <p className="mx-2">|</p>
            {/* <p>Legislative Session: {props.billSession}</p> */}
          </div>
          <p className="text-sm text-gray-600"><span className="font-bold">Author:</span> {props.billAuthor}</p>
          <p className="text-sm text-gray-600"><span className="uppercase">Excerpt:</span> {props.billExcerpt}</p>
        </div>
        <div className="ml-auto">
          {/* <p className="whitespace-nowrap text-right">Session: {props.billSession}</p> */}
        {props.billIsTracked ? (
          <p className="whitespace-nowrap mt-2">Tracking in: <span className="bg-gray-400 px-4 py-2 rounded-full">{props.dashboard.dashboardName}</span></p>
          ) : (
          <>
            {/* @ts-expect-error Server Component */}
            <AccessControlledComponent
              viewerRender={(<></>) as any}
              editorRender={billDashboardAdd(props) as any}
            />
          </>
        )}
        </div>
      </div>
    </div>
  );
};

export const DashboardListItem: NextPage<DashboardListItemProps> = function DashboardListItem(props) {
  return (
    <div className="relative">
      <div className="border border-gray-500 rounded-xl p-4 m-2 flex">
        <div>
        <p><span className="font-bold">{props.billNumber}</span> {props.billCustomName ? props.billCustomName : props.billName}</p>
        <div className="flex">
            <p>
                <a href={props.billLink} target="_blank" title={props.billNumber}>
                <span className="font-bold text-blue-lighter z-10 hover:opacity-70">leginfo.gov </span> <Image className="inline mb-1" src="/link.svg" alt="Link" width={14} height={14} />
                </a>
              </p> 
          </div>
          <div className="mt-2">
            
            <p className="text-sm text-gray-600"><span className="font-bold">Bill history:</span> {props.billLatest}</p>
            <p className="text-sm text-gray-600"><span className="font-bold">Upcoming activity:</span> {props.billUpcoming}</p>
            <p className="text-sm text-gray-600"><span className="font-bold">Our last action:</span> {props.billLastAction}</p>
          </div>
          <div className="mt-2 flex">
            <p className="">Org Position: {props.billPosition ? props.billPosition : (<span className="italic">none set</span>)}</p>
          </div>
          {/* <div className="mt-2 flex">
            <p className="">Issue Area: {props.billIssue ? props.billIssue : (<span className="italic">none set</span>)}</p>
          </div> */}
          <div className="mt-2 flex">
            <p className="">Assigned to: {props.billAssignedTo ? props.billAssignedTo : (<span className="italic">none set</span>)}</p>
          </div>
        </div>
        <div className="ml-auto flex z-10">
          <p className="mt-2">Tracking in: <span className="bg-gray-400 px-4 py-2 rounded-full">{props.dashboard.dashboardName}</span></p>
          {/* @ts-expect-error Server Component */}
          <AccessControlledComponent
            viewerRender={(<></>) as any}
            editorRender={billDashboardRemove(props) as any}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardListItem;