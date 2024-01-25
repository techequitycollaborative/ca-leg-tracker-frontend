'use client'
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function BillDetails({
  submit,
  billDetails,
  positionId,
  issueId,
  sponsorId,
  assignedUserId,
  positionList,
  issueList,
  sponsorList,
  userList
} : any) {
  const [displayModal, setDisplayModal] = useState(false);
  const [alternateName, setAlternateName] = useState("");
  const [policyNotes, setPolicyNotes] = useState("");
  const [orgPosition, setOrgPosition] = useState(0);
  const [platformArea, setPlatformArea] = useState(0);
  const [communitySponsor, setCommunitySponsor] = useState(0);
  const [politicalIntel, setPoliticalIntel] = useState("");
  const [assignedTo, setAssignedTo] = useState(0);

  function resetValues() {
    setAlternateName(billDetails?.alternateName);
    setPolicyNotes(billDetails?.policyNotes);
    setOrgPosition(positionId);
    setPlatformArea(issueId);
    setCommunitySponsor(sponsorId);
    setPoliticalIntel(billDetails?.politicalIntel);
    setAssignedTo(assignedUserId);
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
      <Button type="button" onClick={toggleModal}>Edit Details</Button>
      <div className={(displayModal ? "" : "hidden ") + "bg-white opacity-60 fixed top-0 left-0 right-0 bottom-0"} onClick={toggleModal}/>
      <div className={(displayModal ? "" : "hidden ") + "drop-shadow bg-gray-100 fixed top-1/4 left-1/4 h-1/2 w-1/2"}>
        <p className="cursor-pointer hover:opacity-70 absolute right-4 top-2 text-gray-600" onClick={toggleModal}>X</p>
        <div className="p-10">
          <div className="text-left flex flex-row flex-wrap">
            <input type="hidden" id="billDetailsId" name="billDetailsId" value={billDetails?.billDetailsId} />

            <p className="w-1/3 font-bold mb-2">Alternate name:</p>
            <input
              className="w-2/3 mb-2 pl-1"
              id="alternateName"
              name="alternateName"
              type="text"
              onChange={e => handleInputChange(e, setAlternateName)} value={alternateName}
            />

            <p className="w-1/3 font-bold mb-2">Policy notes:</p>
            <input
              className="w-2/3 mb-2 pl-1"
              id="policyNotes"
              name="policyNotes"
              type="text"
              onChange={e => handleInputChange(e, setPolicyNotes)} value={policyNotes}
            />

            <p className="w-1/3 font-bold mb-2">Org position:</p>
            <select
              className="w-2/3 mb-2"
              id="orgPosition"
              name="orgPosition"
              value={orgPosition}
              onChange={e => handleInputChange(e, setOrgPosition)}
            >
              <option value={undefined}></option>
              {positionList.map((x: any, i: any) => (
                  <option key={i} value={x.orgPositionId}>{x.orgPositionName}</option>
              ))}
            </select>

            <p className="w-1/3 font-bold mb-2">Platform area:</p>
            <select
              className="w-2/3 mb-2"
              id="platformArea"
              name="platformArea"
              value={platformArea}
              onChange={e => handleInputChange(e, setPlatformArea)}
            >
              <option value={undefined}></option>
              {issueList.map((x: any, i: any) => (
                  <option key={i} value={x.issueId}>{x.issueName}</option>
              ))}
            </select>

            <p className="w-1/3 font-bold mb-2">Community sponsor:</p>
            <select
              className="w-2/3 mb-2"
              id="communitySponsor"
              name="communitySponsor"
              value={communitySponsor}
              onChange={e => handleInputChange(e, setCommunitySponsor)}
            >
              <option value={undefined}></option>
              {sponsorList.map((x: any, i: any) => (
                  <option key={i} value={x.communityOrgId}>{x.communityOrgName}</option>
              ))}
            </select>

            <p className="w-1/3 font-bold mb-2">Political intel:</p>
            <input
              className="w-2/3 mb-2 pl-1"
              id="politicalIntel"
              name="politicalIntel"
              type="text"
              onChange={e => handleInputChange(e, setPoliticalIntel)} value={politicalIntel}
            />

            <p className="w-1/3 font-bold mb-2">Assigned to:</p>
            <select
              className="w-2/3 mb-2"
              id="assignedUser"
              name="assignedUser"
              value={assignedTo}
              onChange={e => handleInputChange(e, setAssignedTo)}
            >
              <option value={undefined}></option>
              {userList.map((x: any, i: any) => (
                  <option key={i} value={x.userId}>{x.userName}</option>
              ))}
            </select>
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