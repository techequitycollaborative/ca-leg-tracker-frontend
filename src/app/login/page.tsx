import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button'

import { IUserRepository } from '@/definitions/user.repository';
import { repositories } from '@/repositories/index';

const Page = async ({}) => {
  const users = (await repositories.userRepository.list({ limit: 20 })) as
    | IUserRepository[]
    | null;
  return (
    <div>
      <h3 className="font-bold text-lg mb-2 mt-10 text-center">Select User</h3>
      <div className="text-center mb-10">
        <select className="mr-4 h-10 px-4">
          {users &&
            users.map((x: any, i: any) => (
              <option key={i}>{x.userName}</option>
          ))}
        </select>
        <Button><a href="./dashboard">Login</a></Button>
      </div>
    </div>
  );
};

export default Page;
