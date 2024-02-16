import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';
import BillNav from '@/components/bill-nav';
import ActionListItem from '@/components/action-list-item';
import { Button } from '@/components/ui/button';

import { getDashboard } from 'lib/session';
import { saveUserAction } from 'app/actions';
import EditUserAction from '@/components/forms/user-action';
import { UserAction } from "@/infrastructure/drizzle/schema/user-action";
import UserHistoryListItem from '@/components/user-history-list-item';

interface ScheduleEntry {
  date: Date;
  dateString: string;
  text: string;
  isUserAction: boolean,
  details: {
    userAction: UserAction;
    userActionTypeName: string;
    userActionStatusName: string;
    legislatorName: string;
    committeeName: string;
  } | null;
}

const Page = async ({ params }: PageProps) => {
  const dashboardId = (await getDashboard()).dashboardId;
  const { bill_id } = params;
  const billDashboard = (await repositories.billRepository.getBillDashboard(parseInt(bill_id), dashboardId));
  const bill = await repositories.billRepository.getById(bill_id);
  const billHistory = await repositories.billRepository.getBillHistoryByBillId(parseInt(bill_id));
  const billSchedule = await repositories.billRepository.getBillScheduleByBillId(parseInt(bill_id));
  const billActions = await repositories.billRepository.getBillActions(parseInt(bill_id), dashboardId);

  const userList = await repositories.userRepository.list();
  const userActionTypeList = await repositories.userActionTypeRepository.list({limit: 100});
  const userActionStatusList = await repositories.userActionStatusRepository.list({limit: 100});
  const legislatorList = await repositories.legislatorRepository.list({limit: 100});
  const committeeList = await repositories.committeeRepository.list({limit: 100});

  let billFullUpcoming: ScheduleEntry[] = [];
  let billFullHistory: ScheduleEntry[] = [];

  billHistory && billHistory.map((x: any, i: any) => {
    const entry = {
      date: new Date(x.eventDate),
      dateString: new Date(x.eventDate + 'T00:00:00').toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric' }),
      text: x.eventText,
      isUserAction: false,
      details: null,
    }
    billFullHistory.push(entry);
  });

  billSchedule && billSchedule.map((x: any, i: any) => {
    const entry = {
      date: new Date(x.eventDate),
      dateString: new Date(x.eventDate + 'T00:00:00').toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric' }),
      text: x.eventText,
      isUserAction: false,
      details: null,
    }
    billFullUpcoming.push(entry);
  });

  const today = new Date();
  billActions && billActions.map((x: any, i: any) => {
    const entry = {
      date: new Date(x.userAction.dueDate),
      dateString: new Date(x.userAction.dueDate + 'T00:00:00').toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric' }),
      text: x.userAction.notes,
      isUserAction: true,
      details: {
        userAction: x.userAction,
        userActionTypeName: x.userActionTypeName,
        userActionStatusName: x.userActionStatusName,
        legislatorName: x.legislatorName,
        committeeName: x.committeeName,
      },
    }

    if (today > entry.date) {
      billFullHistory.push(entry);
    }
    else {
      billFullUpcoming.push(entry);
    }
  });

  const billFullUpcomingSorted = billFullUpcoming.sort((a,b) => a['date'].valueOf() - b['date'].valueOf());
  const billFullHistorySorted = billFullHistory.sort((a,b) => b['date'].valueOf() - a['date'].valueOf());

  function formatHistoryEntry(x: ScheduleEntry) {
    if (x.isUserAction && x.details != null) {
      return (
        <UserHistoryListItem
          date={x.dateString}
          title={x.details.userActionTypeName}
          status={x.details.userActionStatusName}
          legislator={x.details.legislatorName}
          committee={x.details.committeeName}
          link={x.details.userAction.link}
          notes={x.details.userAction.notes}
        />
      );
    }
    else {
      return (
        <p className="mb-1">{x.dateString}: {x.text}</p>
      );
    }
  }

  return (
    <>
      <BillNav
        current="activity"
      />
      <div className="border border-gray-500 rounded-xl p-4 mt-4">
        <div className="flex">
          <h3 className="font-bold text-lg">Our Actions</h3>
          <div className="ml-auto">
            <EditUserAction
              isNew={true}
              submit={saveUserAction}
              billDashboardId={billDashboard?.billDashboardId}
              userAction={null}
              userList={userList}
              userActionTypeList={userActionTypeList}
              userActionStatusList={userActionStatusList}
              legislatorList={legislatorList}
              committeeList={committeeList}
            />
          </div>
        </div>
        <div className="mt-4">
          {billActions &&
            billActions.map((x: any, i: any) => (
              <ActionListItem
                key={i}
                submit={saveUserAction}
                userAction={x.userAction}
                title={x.userActionTypeName}
                committee={x.committeeName}
                legislator={x.legislatorName}
                status={x.userActionStatusName}
                userList={userList}
                userActionTypeList={userActionTypeList}
                userActionStatusList={userActionStatusList}
                legislatorList={legislatorList}
                committeeList={committeeList}
              />
          ))}
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-lg">Schedule</h3>
        <div className="mt-2">
          <p className="font-bold">Upcoming</p>
          {billFullUpcomingSorted.map((x: any, i: any) => (
            <div key={i}>
              {formatHistoryEntry(x)}
            </div>
          ))}
        </div>
        <div className="mt-2">
          <p className="font-bold">History</p>
          {billFullHistorySorted.map((x: any, i: any) => (
            <div key={i}>
              {formatHistoryEntry(x)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
