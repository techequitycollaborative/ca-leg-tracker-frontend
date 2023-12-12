import { NextPage } from 'next';

interface Props {
  current: "details"|"activity"|"votes";
}

const BillNav: NextPage<Props> = function BillNav(props) {
  return (
    <div className="flex pt-2">
      <p className={"hover:opacity-60 px-2 mx-2" + (props.current == "details" ? " border-b border-black" : "")}><a href="./details">Details</a></p>
      <p className={"hover:opacity-60 px-2 mx-2" + (props.current == "activity" ? " border-b border-black" : "")}><a href="./activity">Activity & Actions</a></p>
      <p className={"hover:opacity-60 px-2 mx-2" + (props.current == "votes" ? " border-b border-black" : "")}><a href="./votes">Votes</a></p>
    </div>
  );
};

export default BillNav;