'use client'
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function Login({ submit, users, dashboards } : any) {
  const [userId, setUserId] = useState(users[0].userId);
  const [userName, setUserName] = useState(users[0].userName);
  const [userAccessLevel, setUserAccessLevel] = useState(users[0].userAccessLevel);
  const [dashboardId, setDashboardId] = useState(dashboards[0].dashboardId);
  const [dashboardName, setDashboardName] = useState(dashboards[0].dashboardName);

  function handleUserChange(e: any) {
    const userId = e.target.value as number;
    setUserId(userId);

    users.map((x: any, i: any) => {
      if (x.userId == userId) {
        setUserName(x.userName);
        setUserAccessLevel(x.userAccessLevel);
      }
    });
  }

  function handleDashboardChange(e: any) {
    const dashboardId = e.target.value as number;
    setDashboardId(dashboardId);

    dashboards.map((x: any, i: any) => {
      if (x.dashboardId == dashboardId) {
        setDashboardName(x.dashboardName);
      }
    });
  }

  return (
    <form action={submit}>
      <input type="hidden" id="dashboardName" name="dashboardName" value={dashboardName} />
      <input type="hidden" id="userName" name="userName" value={userName} />
      <input type="hidden" id="userName" name="userAccessLevel" value={userAccessLevel} />
      <div className="flex w-1/2 mx-auto my-2">
        <p className="w-1/3 pt-1 mr-6 text-lg text-right">Dashboard:</p>
        <select
          className="mr-4 h-10 px-4 w-1/2"
          id="dashboardId"
          name="dashboardId"
          value={dashboardId}
          onChange={e => handleDashboardChange(e)}
        >
          {dashboards &&
            dashboards.map((x: any, i: any) => (
              <option key={i} value={x.dashboardId}>{x.dashboardName}</option>
          ))}
        </select>
      </div>
      <div className="flex w-1/2 m-auto">
        <p className="w-1/3 pt-1 mr-6 text-lg text-right">User:</p>
        <select
          className="mr-4 h-10 px-4 w-1/2"
          id="userId"
          name="userId"
          value={userId}
          onChange={e => handleUserChange(e)}
        >
          {users &&
            users.map((x: any, i: any) => (
              <option key={i} value={x.userId}>{x.userName}</option>
          ))}
        </select>
      </div>
      <Button className="mt-4" type="submit">Login</Button>
    </form>
  );
}
