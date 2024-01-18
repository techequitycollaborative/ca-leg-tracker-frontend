'use client'
import { Button } from '@/components/ui/button';

export default function DiscussionComment({ submit, dashboardId, billId, userId } : any) {
  return (
    <form action={submit} onSubmit={onSubmit}>
      <input type="hidden" id="dashboardId" name="dashboardId" value={dashboardId} />
      <input type="hidden" id="billId" name="billId" value={billId} />
      <input type="hidden" id="userId" name="userId" value={userId} />
      <input className="w-full my-2" id="commentText" name="commentText" type="text" />
      <Button type="submit">Submit</Button>
    </form>
  );
}

function onSubmit() {
  window.location.reload();
}