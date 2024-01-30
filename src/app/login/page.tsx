import { redirect } from 'next/navigation';

import Login from '@/components/forms/login';
import { saveLogin } from 'app/actions';

import { IUserRepository } from '@/definitions/user.repository';
import { repositories } from '@/repositories/index';


const Page = async ({}) => {
  const users = await repositories.userRepository.list({ limit: 20 });
  const dashboards = await repositories.dashboardRepository.list({limit: 20});

  return (
    <div className="bg-gray-300 w-1/2 m-auto py-1 mt-8">
      <h3 className="font-bold text-lg mb-2 mt-10 text-center">Please log in</h3>
      <div className="text-center mb-10">
        <Login
          submit={saveLogin}
          users={users}
          dashboards={dashboards}
        />
      </div>
    </div>
  );
};

export default Page;
