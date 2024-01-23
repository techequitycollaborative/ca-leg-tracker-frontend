'use client'
import { Button } from '@/components/ui/button';

export function BillDashboardAdd({ submit, dashboardId, billId } : any) {
  return (
    <form action={submit} onSubmit={onSubmit}>
      <input type="hidden" id="dashboardId" name="dashboardId" value={dashboardId} />
      <input type="hidden" id="billId" name="billId" value={billId} />
      <Button type="submit">+ Add to dashboard</Button>
    </form>
  );
}

export function BillDashboardRemove({ submit, dashboardId, billId } : any) {
  return (
    <form action={submit} onSubmit={onSubmit}>
      <input type="hidden" id="dashboardId" name="dashboardId" value={dashboardId} />
      <input type="hidden" id="billId" name="billId" value={billId} />
      <Button type="submit">Remove</Button>
    </form>
  );
}

function onSubmit() {
  window.location.reload();
}