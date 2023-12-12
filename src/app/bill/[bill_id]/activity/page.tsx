import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';
import BillNav from '@/components/bill-nav';
import ActionListItem from '@/components/action-list-item';
import { Button } from '@/components/ui/button';

const Page = async ({ params }: PageProps) => {
  const { bill_id } = params;
  const bill = await repositories.billRepository.getById(bill_id);
  return (
    <>
      <BillNav
        current="activity"
      />
      <div className="border border-gray-500 rounded-xl p-4 mt-4">
        <div className="flex">
          <h3 className="font-bold text-lg">Our Actions</h3>
          <div className="ml-auto"><Button>Add new action</Button></div>
        </div>
        <div className="mt-4">
          <ActionListItem
            type="[action type]"
            committee="[committee]"
            status="[status]"
            notes="[notes]"
            due="[due date]"
            link="[link]"
          />
          <ActionListItem
            type="[action type]"
            committee="[committee]"
            status="[status]"
            notes="[notes]"
            due="[due date]"
            link="[link]"
          />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-lg">Schedule</h3>
        <div className="mt-2">
          <p className="font-bold">Upcoming</p>
          <p>[date] [action]</p>
          <p>[date] [action]</p>
          <p>[date] [action]</p>
        </div>
        <div className="mt-2">
          <p className="font-bold">History</p>
          <p>[date] [action]</p>
          <p>[date] [action]</p>
          <p>[date] [action]</p>
          <p>[date] [action]</p>
          <p>[date] [action]</p>
          <p>[date] [action]</p>
          <p>[date] [action]</p>
        </div>
      </div>
    </>
  );
};

export default Page;
