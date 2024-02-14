import { repositories } from '@/repositories/index';
import { PageProps } from '@/definitions/page.types.definitions';
import { ChamberVoteResult } from "@/infrastructure/drizzle/schema/chamber-vote-result";
import BillNav from '@/components/bill-nav';
import VoteListItem from '@/components/vote-list-item';

const Page = async ({ params }: PageProps) => {
  const { bill_id } = params;
  const bill = await repositories.billRepository.getById(bill_id);
  const votes = await repositories.billRepository.getBillVotes(parseInt(bill_id));

  function isCommitteeVote(vote: ChamberVoteResult) {
    const votesFor = (vote.votesFor == null ? 0 : vote.votesFor);
    const votesAgainst = (vote.votesAgainst == null ? 0 : vote.votesAgainst);
    const votesOther = (vote.votesOther == null ? 0 : vote.votesOther);

    if (votesFor + votesAgainst + votesOther < 25) {
      return true;
    }
    else {
      return false;
    }
  }

  return (
    <>
      <BillNav
        current="votes"
      />
      <div>
      {votes &&
        votes.map((x: any, i: any) => (
          <VoteListItem
            key={i}
            date={new Date(x.vote.voteDate + 'T00:00:00').toLocaleString([], { year: 'numeric', month: 'long', day: 'numeric' })}
            result={x.vote.voteResult}
            location={x.chamber.name + (isCommitteeVote(x.vote) ? " (Committee)" : " (Full Chamber)")}
            threshold={x.vote.voteThreshold}
            ayes={x.vote.votesFor}
            noes={x.vote.votesAgainst}
            nvr={x.vote.votesOther}
            motion={x.vote.voteText}
            borderBottom={i == votes.length - 1 ? false : true}
          />
      ))}
      </div>
    </>
  );
};

export default Page;
