import { NextPage } from 'next';

interface Props {
  date: string;
  result: string;
  location: string;
  ayes: number;
  noes: number;
  nvr: number;
  motion: string;
  borderBottom: boolean;
}

const VoteListItem: NextPage<Props> = function VoteListItem(props) {
  return (
    <div className={"m-4" + (props.borderBottom ? " border-b border-gray-500 pb-4" : "")}>
      <p><span className="font-bold">Date:</span> {props.date}</p>
      <p><span className="font-bold">Result:</span> {props.result}</p>
      <p><span className="font-bold">Location:</span> {props.location}</p>
      <p><span className="font-bold">Ayes:</span> {props.ayes}</p>
      <p><span className="font-bold">Noes:</span> {props.noes}</p>
      <p><span className="font-bold">NVR:</span> {props.nvr}</p>
      <p><span className="font-bold">Motion:</span> {props.motion}</p>
    </div>
  );
};

export default VoteListItem;
