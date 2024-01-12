import { NextPage } from 'next';
import { Button } from '@/components/ui/button'

interface Props {
  date: string,
  description: string,
}

const ActionListItem: NextPage<Props> = function ActionListItem(props) {
  return (
    <div className="bg-gray-300 mt-4 p-2">
      <div className="flex">
        <div className="w-full">
          <div className="flex">
            <p className="w-1/3 font-bold">Date:</p>
            <p className="w-2/3">{props.date}</p>
          </div>
          <div className="flex">
            <p className="w-1/3 font-bold">Description:</p>
            <p className="w-2/3">{props.description}</p>
          </div>
        </div>
        <div className="w-1/3 ml-10"><Button>Update action</Button></div>
      </div>
    </div>
  );
};

export default ActionListItem;
