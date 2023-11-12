import { NextPage } from 'next';

interface Props {
  
}

const BillListItem: NextPage<Props> = function BillListItem(props) {
  return (
    <div className="border-2 border-gray">
      <p>this is a bill</p>
    </div>
  );
};

export default BillListItem;