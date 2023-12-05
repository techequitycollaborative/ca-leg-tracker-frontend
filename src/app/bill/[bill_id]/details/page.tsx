import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';

const Page = async ({ params }: PageProps) => {
  const { bill_id } = params;
  const bill = await repositories.billRepository.getById(bill_id);
  return (
    <>
      <div>
        <p>bill details</p>
      </div>
    </>
  );
};

export default Page;
