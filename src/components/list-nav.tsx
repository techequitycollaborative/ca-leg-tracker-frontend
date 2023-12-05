import { NextPage } from 'next';

interface Props {
}

const ListNav: NextPage<Props> = function ListNav(props) {
  return (
    <div className='flex border-2 border-black p-4 m-4'>
      <div className='flex-1 w-1/2'>
        <p>bill filters</p>
      </div>
      <div className='flex-1 w-1/2 text-right'>
        <p>bill sort</p>
      </div>
    </div>
  );
};

export default ListNav;