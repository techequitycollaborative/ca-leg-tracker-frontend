'use server'
import { repositories } from '@/repositories/index';
import { login } from 'lib/session';
import { redirect } from 'next/navigation'
import { UserAccessLevel } from 'lib/session';

export async function saveDiscussionComment(formData: FormData) {
  await repositories.billRepository.saveDiscussionComment(
    parseInt(formData.get('dashboardId') as string),
    parseInt(formData.get('billId') as string),
    parseInt(formData.get('userId') as string),
    formData.get('commentText') as string
  );
}

export async function saveBillDetails(formData: FormData) {
  const assignedUserData = parseInt(formData.get('assignedUser') as string);
  const platformAreaData = parseInt(formData.get('platformArea') as string);
  const orgPositionData = parseInt(formData.get('orgPosition') as string);
  const priorityTierData = parseInt(formData.get('priorityTier') as string);
  const userId = isNaN(assignedUserData) ? null : assignedUserData;
  const issueId = isNaN(platformAreaData) ? null : platformAreaData;
  const orgPositionId = isNaN(orgPositionData) ? null : orgPositionData;
  const priorityId = isNaN(priorityTierData) ? null : priorityTierData;


  await repositories.billRepository.saveBillDetails(
    parseInt(formData.get('billDetailsId') as string),
    formData.get('alternateName') as string,
    userId,
    issueId,
    orgPositionId,
    priorityId,
    formData.get('communitySponsor') as string,
    formData.get('coalition') as string,
    formData.get('politicalIntel') as string,
    formData.get('policyNotes') as string

  );
}

export async function saveUserAction(formData: FormData) {
  const userActionId = (formData.get('userActionId') ? parseInt(formData.get('userActionId') as string) : null);

  const legislatorIdData = parseInt(formData.get('legislatorId') as string);
  const committeeIdData = parseInt(formData.get('committeeId') as string);

  const legislatorId = isNaN(legislatorIdData) ? null : legislatorIdData;
  const committeeId = isNaN(committeeIdData) ? null : committeeIdData;

  await repositories.billRepository.saveUserAction(
    parseInt(formData.get('billDashboardId') as string),
    userActionId,
    parseInt(formData.get('typeId') as string),
    formData.get('dueDate') as string,
    parseInt(formData.get('statusId') as string),
    legislatorId,
    committeeId,
    formData.get('link') as string,
    formData.get('notes') as string,
  );
}

export async function saveLogin(formData: FormData) {
  await login(
    {userId: parseInt(formData.get('userId') as string), userName: formData.get('userName') as string, userAccessLevel: formData.get('userAccessLevel') as UserAccessLevel},
    {dashboardId: parseInt(formData.get('dashboardId') as string), dashboardName: formData.get('dashboardName') as string}
  );
  redirect('/dashboard');
}

export async function addBillToDashboard(formData: FormData) {
  await repositories.dashboardRepository.addBillToDashboard(
    parseInt(formData.get('dashboardId') as string),
    parseInt(formData.get('billId') as string)
  );
}

export async function removeBillFromDashboard(formData: FormData) {
  await repositories.dashboardRepository.removeBillFromDashboard(
    parseInt(formData.get('dashboardId') as string),
    parseInt(formData.get('billId') as string)
  );
}