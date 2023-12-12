import { NextPage } from 'next';
import { Button } from '@/components/ui/button'

interface Props {
  type: string;
  committee: string;
  status: string;
  notes: string;
  due: string;
  link: string;
}

const ActionListItem: NextPage<Props> = function ActionListItem(props) {
  return (
    <div className="bg-gray-300 mt-4 p-2">
      <div className="flex">
        <p className="font-bold text-lg">{props.type}</p>
        <div className="ml-auto"><Button>Update action</Button></div>
      </div>
      <div className="flex flex-row flex-wrap">
        <p className="w-1/4 font-bold">Committee:</p>
        <p className="w-3/4">{props.committee}</p>

        <p className="w-1/4 font-bold">Status:</p>
        <p className="w-3/4">{props.status}</p>

        <p className="w-1/4 font-bold">Due on:</p>
        <p className="w-3/4">{props.due}</p>

        <p className="w-1/4 font-bold">Link:</p>
        <p className="w-3/4">{props.link}</p>

        <p className="w-1/4 font-bold">Notes:</p>
        <p className="w-3/4 italic">{props.notes}</p>
      </div>
    </div>
  );
};

export default ActionListItem;
