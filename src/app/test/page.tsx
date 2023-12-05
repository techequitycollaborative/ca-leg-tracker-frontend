
import { ILegislator } from "definitions/legislator.repository"
import { repositories } from "repositories"

const Page = async ({}) => {
  const legislators = await repositories.legislatorRepository.list({limit:20}) as ILegislator[] | null
  return (
    <>
      <ul>
        {legislators && legislators?.map((b) => {
          return (
            <li key={b?.legislatorId}>
             <p> Name: {b?.name}</p>
             <p> Party: {b?.party}</p>
             <p> District: {b?.district}</p>

            </li>
          )
        })}
      </ul>
    </>
  )
   
  
}

export default Page;