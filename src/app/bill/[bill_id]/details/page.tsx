import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';
import BillNav from '@/components/bill-nav';
import { Button } from '@/components/ui/button';

const Page = async ({ params }: PageProps) => {
  const { bill_id } = params;
  const bill = await repositories.billRepository.getById(bill_id);
  return (
    <>
      <BillNav
        current="details"
      />
      <div className="flex flex-row flex-wrap border border-gray-500 rounded-xl p-4 mt-4">
        <p className="w-1/3 font-bold">Alternate name:</p>
        <p className="w-2/3">[custom name]</p>

        <p className="w-1/3 font-bold">Policy notes:</p>
        <p className="w-2/3">[notes]</p>

        <p className="w-1/3 font-bold">Org position:</p>
        <p className="w-2/3">[position]</p>

        <p className="w-1/3 font-bold">Platform area:</p>
        <p className="w-2/3">[issues]</p>

        <p className="w-1/3 font-bold">Community sponsors:</p>
        <p className="w-2/3">[list of sponsors]</p>

        <p className="w-1/3 font-bold">Political intel:</p>
        <p className="w-2/3">[notes]</p>

        <p className="w-1/3 font-bold">Assigned to:</p>
        <p className="w-2/3">[user]</p>

        <div className="my-4 w-full border-b border-gray-500"></div>
        <div className="w-full text-center"><Button>Edit Details</Button></div>
      </div>
      <div className="mt-4">
        <p><span className="font-bold">Measure:</span> {bill?.billNumber}</p>
        <p><span className="font-bold">Topic:</span> {bill?.billName}</p>
        <p><span className="font-bold">Lead Author:</span> [author]</p>
        <p><span className="font-bold">Coauthors:</span> [coauthors]</p>
        <p><span className="font-bold">Title:</span> {bill?.billName}</p>
        <p><span className="font-bold">House Location:</span> [last action house]</p>
        <p><span className="font-bold">Introduced Date:</span> [date]</p>
        <p><span className="font-bold">Committee Location:</span> [last action committee]</p>
      </div>
    </>
  );
};

export default Page;
