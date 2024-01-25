import { NextPage } from 'next';
import { Button } from '@/components/ui/button'
import { UserAction } from '@/infrastructure/drizzle/schema/user-action';
import { IUser } from '@/definitions/user.repository';
import { IUserActionType } from '@/definitions/useractiontype.repository';
import { IUserActionStatus } from '@/definitions/useractionstatus.repository';
import { ILegislator } from '@/definitions/legislator.repository';
import { ICommittee } from '@/definitions/committee.repository';
import EditUserAction from '@/components/forms/user-action';

interface Props {
  submit: (formData: FormData) => Promise<void>,
  userAction: UserAction,
  title: string,
  committee: string,
  legislator: string,
  status: string,
  userList: IUser[] | null,
  userActionTypeList: IUserActionType[] | null,
  userActionStatusList: IUserActionStatus[] | null,
  legislatorList: ILegislator[] | null,
  committeeList: ICommittee[] | null,
}

const ActionListItem: NextPage<Props> = function ActionListItem(props) {
  return (
    <div className="bg-gray-300 mt-4 p-2">
      <div className="flex">
        <div className="w-full">
          <div className="w-full">
            <p className="text-lg font-bold pb-4">{props.title}</p>
          </div>
          <div className="flex">
            <p className="w-1/3 font-bold">Due on:</p>
            <p className="w-2/3">{props.userAction.dueDate}</p>
          </div>
          <div className="flex">
            <p className="w-1/3 font-bold">Status:</p>
            <p className="w-2/3">{props.status}</p>
          </div>
          <div className="flex">
            <p className="w-1/3 font-bold">Link:</p>
            <p className="w-2/3">{props.userAction.link}</p>
          </div>
          <div className="flex">
            <p className="w-1/3 font-bold">Notes:</p>
            <p className="w-2/3">{props.userAction.notes}</p>
          </div>
        </div>
        <div className="w-1/3 ml-10">
          <EditUserAction
            isNew={false}
            submit={props.submit}
            billDashboardId={props.userAction.billDashboardId}
            userAction={props.userAction}
            userList={props.userList}
            userActionTypeList={props.userActionTypeList}
            userActionStatusList={props.userActionStatusList}
            legislatorList={props.legislatorList}
            committeeList={props.committeeList}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionListItem;
