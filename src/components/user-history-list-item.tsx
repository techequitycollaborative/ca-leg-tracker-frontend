'use client'
import { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  date: string;
  title: string | null;
  status: string | null;
  legislator: string | null;
  committee: string | null;
  link: string | null;
  notes: string | null;
}

const UserHistoryListItem: NextPage<Props> = function UserHistoryListItem(props) {
  const [displayModal, setDisplayModal] = useState(false);

  function toggleModal() {
    setDisplayModal(!displayModal);
  }

  return (
    <>
      <div className={(displayModal ? "" : "hidden ") + "bg-white opacity-60 fixed top-0 left-0 right-0 bottom-0"} onClick={toggleModal}/>
      <div className={(displayModal ? "" : "hidden ") + "drop-shadow bg-gray-100 fixed top-1/4 left-1/4 h-1/2 w-1/3 z-10"}>
        <p className="cursor-pointer hover:opacity-70 absolute right-4 top-2 text-gray-600" onClick={toggleModal}>X</p>
        <div className="p-10">
          <div className="text-left">
            <div className="w-full">
              <p className="text-lg font-bold pb-4">{props.title}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-1/3 font-bold">Date:</p>
              <p className="w-2/3">{props.date}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-1/3 font-bold">Status:</p>
              <p className="w-2/3">{props.status}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-1/3 font-bold">Legislator:</p>
              <p className="w-2/3">{props.legislator}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-1/3 font-bold">Committee:</p>
              <p className="w-2/3">{props.committee}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-1/3 font-bold">Link:</p>
              <p className="w-2/3">{props.link}</p>
            </div>
            <div className="flex mb-2">
              <p className="w-1/3 font-bold">Notes:</p>
              <p className="w-2/3">{props.notes}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-1">
        <p className="text-blue-lighter cursor-pointer inline hover:opacity-70" onClick={toggleModal}>
          {props.date}: {props.title}
          <Image className="inline ml-1 mb-1" src="/bullhorn.png" alt="Link" width={16} height={16} />
        </p>
      </div>
    </>
  );
};

export default UserHistoryListItem;