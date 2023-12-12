import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';
import BillNav from '@/components/bill-nav';
import VoteListItem from '@/components/vote-list-item';

const Page = async ({ params }: PageProps) => {
  const { bill_id } = params;
  const bill = await repositories.billRepository.getById(bill_id);
  return (
    <>
      <BillNav
        current="votes"
      />
      <div>
        <VoteListItem
          date="[date]"
          result="[result]"
          location="[location]"
          ayes={10}
          noes={10}
          nvr={0}
          motion="[motion]"
          borderBottom={true}
        />
        <VoteListItem
          date="[date]"
          result="[result]"
          location="[location]"
          ayes={10}
          noes={10}
          nvr={0}
          motion="[motion]"
          borderBottom={true}
        />
        <VoteListItem
          date="[date]"
          result="[result]"
          location="[location]"
          ayes={10}
          noes={10}
          nvr={0}
          motion="[motion]"
          borderBottom={false}
        />
      </div>
    </>
  );
};

export default Page;
