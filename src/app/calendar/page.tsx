import { redirect } from 'next/navigation';
import { repositories } from '@/repositories/index';
import { getDashboard } from 'lib/session';

const Page = async ({}) => {
  const dashboard = await getDashboard();
  const todayString = new Date().toISOString().slice(0,10);
  const schedule = await repositories.billRepository.getDashboardBillSchedule(dashboard.dashboardId, todayString) as any;
  const actions = await repositories.billRepository.getDashboardUserActions(dashboard.dashboardId, todayString) as any;

  let calendar = {} as any;

  schedule && schedule.map((x: any, i: number) => {
    const eventDate = new Date(x.billSchedule.eventDate + 'T00:00:00').toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric' });
    const row = {
      billId: x.billSchedule.billId,
      text: x.billNumber + ': ' + x.billSchedule.eventText,
      type: 'schedule',
    }
    if (calendar[eventDate] == undefined) {
      calendar[eventDate] = [];
    }
    calendar[eventDate].push(row);
  });

  actions && actions.map((x: any, i: number) => {
    const eventDate = new Date(x.date + 'T00:00:00').toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric' });
    const row = {
      billId: x.billId,
      text: x.billNumber + ': ' + x.text,
      type: 'user',
    }
    if (calendar[eventDate] == undefined) {
      calendar[eventDate] = [];
    }
    calendar[eventDate].push(row);
  });

  return (
    <div className="w-2/3 border border-gray-300 rounded-lg m-auto p-6">
      <h1 className="text-center mb-4 pb-2 font-bold text-2xl border-b border-gray-300">Upcoming Schedule</h1>
      {Object.entries(calendar).map(([date, rows]: any, i) => (
          <div key={'section' + i} className="mb-4">
            <h2 className="font-bold text-gray-600">{date}</h2>
            {rows && rows.map((x: any, j: number) => (
              <p key={j} className={"rounded-sm mb-1 px-2 py-1 " + (x.type === 'user' ? "bg-blue-lightest" : "bg-gray-300")}>{x.text}</p>
            ))}
          </div>
      ))}
    </div>
  );
};

export default Page;
