import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';
import BillNav from '@/components/bill-nav';
import { Button } from '@/components/ui/button';

import { saveBillDetails } from 'app/actions';
import BillDetails from '@/components/forms/bill-details';

const Page = async ({ params }: PageProps) => {
  const dashboardId = 1; // update to pull from session
  const { bill_id } = params;
  const bill = await repositories.billRepository.getEnrichedBillById(parseInt(bill_id), dashboardId);
  const issues = await repositories.billRepository.getBillIssues(parseInt(bill_id), dashboardId);
  const sponsors = await repositories.billRepository.getBillCommunitySponsors(parseInt(bill_id), dashboardId);

  const orgPositionList = await repositories.orgPositionRepository.list({limit: 20});
  const issueList = await repositories.issueRepository.list({limit: 20});
  const communityOrgList = await repositories.communityOrgRepository.list({limit: 20});
  const userList = await repositories.userRepository.list({limit: 20});
  
  return (
    <>
      <BillNav
        current="details"
      />
      <div className="flex flex-row flex-wrap border border-gray-500 rounded-xl p-4 mt-4">
        <p className="w-1/3 font-bold">Alternate name:</p>
        <p className="w-2/3">{bill?.billDetails?.alternateName}</p>

        <p className="w-1/3 font-bold">Policy notes:</p>
        <p className="w-2/3">{bill?.billDetails?.policyNotes}</p>

        <p className="w-1/3 font-bold">Org position:</p>
        <p className="w-2/3">{bill?.orgPosition?.orgPositionName}</p>

        <p className="w-1/3 font-bold">Platform area:</p>
        <p className="w-2/3">
          {issues &&
            issues.map((x: any, i: any) => (
              <span key={i}>{(i > 0 ? " | " : "") + x.issueName}</span>
          ))}
        </p>

        <p className="w-1/3 font-bold">Community sponsor:</p>
        <p className="w-2/3">
          {sponsors &&
            sponsors.map((x: any, i: any) => (
              <span key={i}>{(i > 0 ? " | " : "") + x.communityOrgName}</span>
          ))}
        </p>

        <p className="w-1/3 font-bold">Political intel:</p>
        <p className="w-2/3">{bill?.billDetails?.politicalIntel}</p>

        <p className="w-1/3 font-bold">Assigned to:</p>
        <p className="w-2/3">{bill?.assignedUser?.userName}</p>

        <div className="my-4 w-full border-b border-gray-500"></div>
        <BillDetails
          submit={saveBillDetails}
          billDetails={bill?.billDetails}
          positionId={bill?.orgPosition?.orgPositionId}
          issueId={issues == null ? null : issues[0].issueId}
          sponsorId={sponsors == null ? null : sponsors[0].communityOrgId}
          assignedUserId={bill?.assignedUser?.userId}
          positionList={orgPositionList}
          issueList={issueList}
          sponsorList={communityOrgList}
          userList={userList}
        />
      </div>
      <div className="mt-4">
        <p><span className="font-bold">Measure:</span> {bill?.bill.billNumber}</p>
        <p><span className="font-bold">Topic:</span> {bill?.bill.billName}</p>
        <p><span className="font-bold">Lead Author:</span> {bill?.bill.author}</p>
        <p><span className="font-bold">Coauthors:</span> {bill?.bill.coauthors}</p>
        <p><span className="font-bold">Title:</span> {bill?.bill.billName}</p>
        <p><span className="font-bold">House Location:</span> [last action house]</p>
        <p><span className="font-bold">Introduced Date:</span> [date]</p>
        <p><span className="font-bold">Committee Location:</span> [last action committee]</p>
      </div>
    </>
  );
};

export default Page;
