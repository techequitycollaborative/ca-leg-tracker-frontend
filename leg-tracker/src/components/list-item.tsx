import { NextPage } from 'next';

interface Props {
  billId: number;
  billNumber: string;
  billName: string;
}

const ListItem: NextPage<Props> = function ListItem(props) {
  return (
    <a href={'/bill/' + props.billId + '/details'}>
      <p className="border-2 border-gray-300 p-2 m-2">{props.billNumber + ' - ' + props.billName}</p>
    </a>
  );
};

export default ListItem;