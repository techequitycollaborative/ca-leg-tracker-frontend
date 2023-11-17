import { NextPage } from 'next';

interface Props {
}

const ListSearchBar: NextPage<Props> = function ListSearchBar(props) {
  return (
    <div className="border-2 border-black p-4 m-4">
      <p>bill search bar</p>
    </div>
  );
};

export default ListSearchBar;