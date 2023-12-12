import { repositories } from '@/repositories/index';
import { PageLayoutProps } from '@/definitions/page.types.definitions';
import { Button } from '@/components/ui/button';

const Layout = async ({ params, children }: PageLayoutProps) => {
  const { bill_id } = params;
  const bill = await repositories.billRepository.getById(bill_id);
  return (
    <>
      <div></div>
      <div className="flex m-4">
        <div>
          <h2 className="text-xl"><span className="font-bold">{bill?.billNumber}</span> {bill?.billName}</h2>
          <p>[bill link] | [session name]</p>
        </div>
        <div className="ml-auto">
          <p>Tracking in: [dashboard name]</p>
        </div>
      </div>
      <div className="flex m-4">
        <div className="w-1/2 pr-4">{children}</div>
        <div className="w-1/2 py-4 px-8 bg-gray-300">
          <h3 className="font-bold text-lg">Discussion</h3>
          <p className="font-bold text-sm mt-6">Add a note:</p>
          <textarea className="w-full my-2"></textarea>
          <Button>Submit</Button>
          <p className="mt-8">[previous comments]</p>
        </div>
      </div>
    </>
  );
};

export default Layout;
