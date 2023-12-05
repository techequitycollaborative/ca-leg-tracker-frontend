import Login from '@/components/login';
import { redirect } from 'next/navigation';

const Page = async ({}) => {
  return (
    <>
      <Login />
    </>
  );
};

export default Page;
