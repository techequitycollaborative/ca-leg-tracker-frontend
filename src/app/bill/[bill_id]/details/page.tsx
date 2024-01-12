import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';
import BillNav from '@/components/bill-nav';
import { Button } from '@/components/ui/button';

const Page = async ({ params }: PageProps) => {
  const dashboardId = 1; // update to pull from session
  const { bill_id } = params;
  const bill = await repositories.billRepository.getEnrichedBillById(parseInt(bill_id), dashboardId);
  const issues = await repositories.billRepository.getIssues(parseInt(bill_id), dashboardId);
  const sponsors = await repositories.billRepository.getCommunitySponsors(parseInt(bill_id), dashboardId);

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
              <span key={i}>{(i > 0 ? " | " : "") + x.issue.issueName}</span>
          ))}
        </p>

        <p className="w-1/3 font-bold">Community sponsors:</p>
        <p className="w-2/3">
          {sponsors &&
            sponsors.map((x: any, i: any) => (
              <span key={i}>{(i > 0 ? " | " : "") + x.sponsor.communityOrgName}</span>
          ))}
        </p>

        <p className="w-1/3 font-bold">Political intel:</p>
        <p className="w-2/3">{bill?.billDetails?.politicalIntel}</p>

        <p className="w-1/3 font-bold">Assigned to:</p>
        <p className="w-2/3">{bill?.assignedUser?.userName}</p>

        <div className="my-4 w-full border-b border-gray-500"></div>
        <div className="w-full text-center"><Button>Edit Details</Button></div>
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
