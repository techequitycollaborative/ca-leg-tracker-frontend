'use client'
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function EditUserAction({
  isNew,
  submit,
  billDashboardId,
  userAction,
  userList,
  userActionTypeList,
  userActionStatusList,
  legislatorList,
  committeeList
} : any) {
  const [displayModal, setDisplayModal] = useState(false);
  const [userId, setUserId] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [typeId, setTypeId] = useState(0);
  const [statusId, setStatusId] = useState(0);
  const [legislatorId, setLegislatorId] = useState(0);
  const [committeeId, setCommitteeId] = useState(0);
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");

  function resetValues() {
    if (userAction == null) {
      setUserId(0);
      setDueDate("");
      setTypeId(0);
      setStatusId(0);
      setLegislatorId(0);
      setCommitteeId(0);
      setLink("");
      setNotes("");
    }
    else {
      setUserId(userAction.userId);
      setDueDate(userAction.dueDate);
      setTypeId(userAction.userActionTypeId);
      setStatusId(userAction.userActionStatusId);
      setLegislatorId(userAction.legislatorId);
      setCommitteeId(userAction.committeeId);
      setLink(userAction.link);
      setNotes(userAction.notes);
    }
  }

  function toggleModal() {
    resetValues();
    setDisplayModal(!displayModal);
  }

  function onSubmit() {
    window.location.reload();
  }

  function handleInputChange(e: any, setValue: (value: any) => void) {
    setValue(e.target.value);
  }

  return (
    <form action={submit} onSubmit={onSubmit} className="w-full text-center">
      <input type="hidden" id="billDashboardId" name="billDashboardId" value={billDashboardId} />
      <input type="hidden" id="userActionId" name="userActionId" value={userAction?.userActionId} />
      <Button type="button" onClick={toggleModal}>{isNew ? 'Add new action' : 'Update action'}</Button>
      <div className={(displayModal ? "" : "hidden ") + "bg-white opacity-60 fixed top-0 left-0 right-0 bottom-0"} onClick={toggleModal}/>
      <div className={(displayModal ? "" : "hidden ") + "drop-shadow bg-gray-100 fixed top-1/4 left-1/4 h-1/2 w-1/2"}>
        <p className="cursor-pointer hover:opacity-70 absolute right-4 top-2 text-gray-600" onClick={toggleModal}>X</p>
        <div className="p-10">
          <div className="text-left flex flex-row flex-wrap">
            <p className="w-1/3 font-bold mb-2">Action type:</p>
            <select
              className="w-2/3 mb-2"
              id="typeId"
              name="typeId"
              value={typeId}
              onChange={e => handleInputChange(e, setTypeId)}
            >
              {userActionTypeList.map((x: any, i: any) => (
                  <option key={i} value={x.userActionTypeId}>{x.userActionTypeName}</option>
              ))}
            </select>

            <p className="w-1/3 font-bold mb-2">Due on:</p>
            <input
              className="w-2/3 mb-2 pl-1"
              id="dueDate"
              name="dueDate"
              type="date"
              value={dueDate}
              onChange={e => handleInputChange(e, setDueDate)}
            />

            <p className="w-1/3 font-bold mb-2">Status:</p>
            <select
              className="w-2/3 mb-2"
              id="statusId"
              name="statusId"
              value={statusId}
              onChange={e => handleInputChange(e, setStatusId)}
            >
              {userActionStatusList.map((x: any, i: any) => (
                  <option key={i} value={x.userActionStatusId}>{x.userActionStatusName}</option>
              ))}
            </select>

            <p className="w-1/3 font-bold mb-2">Legislator*:</p>
            <select
              className="w-2/3 mb-2"
              id="legislatorId"
              name="legislatorId"
              value={legislatorId}
              onChange={e => handleInputChange(e, setLegislatorId)}
            >
              {legislatorList.map((x: any, i: any) => (
                  <option key={i} value={x.legislatorId}>{x.name}</option>
              ))}
            </select>

            <p className="w-1/3 font-bold mb-2">Committee*:</p>
            <select
              className="w-2/3 mb-2"
              id="committeeId"
              name="committeeId"
              value={committeeId}
              onChange={e => handleInputChange(e, setCommitteeId)}
            >
              {committeeList.map((x: any, i: any) => (
                  <option key={i} value={x.committeeId}>{x.name}</option>
              ))}
            </select>

            <p className="w-1/3 font-bold mb-2">Link*:</p>
            <input
              className="w-2/3 mb-2 pl-1"
              id="link"
              name="link"
              type="text"
              value={link}
              onChange={e => handleInputChange(e, setLink)}
            />

            <p className="w-1/3 font-bold mb-2">Notes:</p>
            <input
              className="w-2/3 mb-2 pl-1"
              id="notes"
              name="notes"
              type="text"
              value={notes}
              onChange={e => handleInputChange(e, setNotes)}
            />

            <p className="w-full italic">*if applicable</p>
          </div>
          <div>
            <div className="my-4 w-full border-b border-gray-500"></div>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </div>
    </form>
  );
}