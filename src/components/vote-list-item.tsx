import { NextPage } from 'next';

interface Props {
  date: string;
  location: string;
  motion: string;
  threshold: string;
  result: string;
  ayes: number;
  noes: number;
  nvr: number;
  borderBottom: boolean;
}

const VoteListItem: NextPage<Props> = function VoteListItem(props) {
  return (
    <div className={"m-4" + (props.borderBottom ? " border-b border-gray-500 pb-4" : "")}>
      <p><span className="font-bold">Date:</span> {props.date}</p>
      <p><span className="font-bold">Location:</span> {props.location}</p>
      <p><span className="font-bold">Motion:</span> {props.motion}</p>
      <p><span className="font-bold">Threshold:</span> {props.threshold}</p>
      <p className="capitalize"><span className="font-bold">Result:</span> {props.result}</p>
      <p><span className="font-bold">Ayes:</span> {props.ayes}</p>
      <p><span className="font-bold">Noes:</span> {props.noes}</p>
      <p><span className="font-bold">NVR:</span> {props.nvr}</p>
    </div>
  );
};

export default VoteListItem;
