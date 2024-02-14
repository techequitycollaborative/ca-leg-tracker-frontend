import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';
import BillNav from '@/components/bill-nav';
import ActionListItem from '@/components/action-list-item';
import { Button } from '@/components/ui/button';

import { getDashboard } from 'lib/session';
import { saveUserAction } from 'app/actions';
import EditUserAction from '@/components/forms/user-action';

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
          {billSchedule &&
            billSchedule.map((x: any, i: any) => (
              <div key={i}>
                <p>{new Date(x.eventDate + 'T00:00:00').toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric' })}: {x.eventText}</p>
              </div>
            ))}
        </div>
        <div className="mt-2">
          <p className="font-bold">History</p>
          {billHistory &&
            billHistory.map((x: any, i: any) => (
              <div key={i}>
                <p className="mb-1">{new Date(x.eventDate + 'T00:00:00').toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric' })}: {x.eventText}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
