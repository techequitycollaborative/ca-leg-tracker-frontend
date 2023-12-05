import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';
import BillNav from '@/components/bill-nav';

const Layout = async ({ params, children }: PageProps) => {
  const { bill_id } = params;
  const bill = await repositories.billRepository.getById(bill_id);
  return (
    <>
      <div></div>
      <div className="flex border-2 border-black p-4 m-4">
        <p>
          bill header ({bill?.billNumber}, {bill?.billName}, dashboard, link,
          session)
        </p>
      </div>
      <div className="flex border-2 border-black m-4">
        <div className="w-1/2 p-4 bg-gray-400">
          <BillNav />
          <div className="border-2 border-black mt-4 p-2">{children}</div>
        </div>
        <div className="w-1/2 p-4 bg-gray-300">
          <p>Discussion panel</p>
        </div>
      </div>
    </>
  );
};

export default Layout;
