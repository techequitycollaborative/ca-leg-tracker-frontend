import Image from 'next/image';
import { redirect } from 'next/navigation'

import { repositories } from '@/repositories/index';
import { PageLayoutProps } from '@/definitions/page.types.definitions';
import { saveDiscussionComment, removeBillFromDashboard } from 'app/actions';
import DiscussionComment from '@/components/forms/discussion-comment';
import { BillDashboardRemove } from '@/components/forms/dashboard-toggle';

import { getUser, getDashboard } from 'lib/session';

const Layout = async ({ params, children }: PageLayoutProps) => {
  const dashboard = await getDashboard();
  const userId = (await getUser()).userId;
  const { bill_id } = params;
  const billId = parseInt(bill_id);

  const billDashboard = await repositories.billRepository.getBillDashboard(billId, dashboard.dashboardId);
  if (!billDashboard || billDashboard.hidden == true) {
    redirect('/');
  }

  const bill = await repositories.billRepository.getById(billId);
  const discussion = await repositories.billRepository.getBillDiscussion(billId, dashboard.dashboardId);

  return (
    <>
      <div className="flex m-4">
        <div>
          <h2 className="text-xl"><span className="font-bold">{bill?.billNumber}</span> {bill?.billName}</h2>
          <div className="flex">
            <p className="text-blue-lighter hover:opacity-70 cursor-pointer">
              <a href={bill?.leginfoLink == null ? "" : bill?.leginfoLink} target="_blank" title={bill?.billNumber == null ? "" : bill?.billNumber}>
                {bill?.billNumber} <Image className="inline mb-1" src="/link.svg" alt="Link" width={14} height={14} />
              </a>
            </p>
            <p className="mx-2">|</p>
            <p>Legislative Session: {bill?.legSession}</p>
          </div>
        </div>
        <div className="ml-auto flex">
          <p className="mt-2">Tracking in: <span className="bg-gray-400 px-4 py-2 rounded-full">{dashboard.dashboardName}</span></p>
          <div className="text-right ml-2">
            <BillDashboardRemove
              submit={removeBillFromDashboard}
              dashboardId={dashboard.dashboardId}
              billId={billId}
            />
          </div>
        </div>
      </div>
      <div className="flex m-4">
        <div className="w-1/2 pr-4">{children}</div>
        <div className="w-1/2 py-4 px-8 bg-gray-300">
          <h3 className="font-bold text-lg">Discussion</h3>
          <p className="font-bold text-sm mt-6">Add a note:</p>
          <DiscussionComment
            submit={saveDiscussionComment}
            dashboardId={dashboard.dashboardId}
            billId={billId}
            userId={userId}
          />
          <div className="my-10">
            {discussion &&
              discussion.map((x: any, i: any) => (
              <div className="my-8 text-sm" key={i}>
                <p className="font-bold">{x.app_user.userName}</p>
                <p>{x.discussion_comment.commentText}</p>
                <p className="mt-2 text-gray-500">{x.discussion_comment.commentDatetime.toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
