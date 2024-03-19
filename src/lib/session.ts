import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';

export enum UserAccessLevel {
  EDITOR = 'Editor',
  VIEWER = 'Viewer',
}

export interface SessionUser {
  userId: number;
  userName: string;
  userAccessLevel: UserAccessLevel;
}

export interface SessionDashboard {
  dashboardId: number;
  dashboardName: string;
}

export async function getSession() {
  const session = await getIronSession(cookies(), { password: process.env.SESSION_PASSWORD as string, cookieName: "login" });
  return session;
}

export async function login(user: SessionUser, dashboard: SessionDashboard) {
  const session = (await getSession()) as any;
  session.user = user;
  session.dashboard = dashboard;
  await session.save();
}

export async function logout() {
  await (await getSession()).destroy();
}

export async function isLoggedIn(): Promise<boolean> {
  const session = (await getSession()) as any;

  if (session.user === undefined || session.dashboard === undefined) {
    return false;
  }
  else {
    return true;
  }
}

export async function getUser(): Promise<SessionUser> {
  return (await getSession() as any).user;
}

export async function getDashboard(): Promise<SessionDashboard> {
  return (await getSession() as any).dashboard;
}
