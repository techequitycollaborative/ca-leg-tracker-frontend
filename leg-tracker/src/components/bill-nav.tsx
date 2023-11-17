import { NextPage } from 'next';

interface Props {
}

const BillNav: NextPage<Props> = function BillNav(props) {
  return (
    <div className='flex border-2 border-black p-2'>
      <p>
        <span><a href="./details">details</a> | </span>
        <span><a href="./activity">activity & actions</a> | </span>
        <span><a href="./votes">votes</a></span>
      </p>
    </div>
  );
};

export default BillNav;