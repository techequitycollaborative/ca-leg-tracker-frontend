import { NextPage } from 'next';

interface Props {
}

const BillSearchBar: NextPage<Props> = function BillSearchBar(props) {
  return (
    <div className="border-2 border-black p-4 m-4">
      <p>bill search bar</p>
    </div>
  );
};

export default BillSearchBar;