'use client'
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  dashboardName: string;
  userName: string;
}

const Navbar: NextPage<Props> = function Navbar(props) {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <div className="w-full flex border-b border-gray-300 px-4 py-2">
      <Link className="flex" href="/">
        <Image className="mb-1" src="/logo.svg" alt="Link" width={60} height={40} />
        <h1 className="text-2xl ml-4 mt-2">Legislation Tracker</h1>
      </Link>
      {pathName !== '/login' && (
      <>
        <div className="flex m-auto">
          <div className="flex pt-2">
            <p className={"hover:opacity-60 px-2 mx-2" + (pathName === "/search" ? " border-b border-black" : "")}><Link href="/search">Search Bills</Link></p>
            <p className={"hover:opacity-60 px-2 mx-2" + (pathName === "/dashboard" ? " border-b border-black" : "")}><Link href="/dashboard">Dashboard</Link></p>
            <p className={"hover:opacity-60 px-2 mx-2" + (pathName === "/calendar" ? " border-b border-black" : "")}><Link href="/calendar">Calendar</Link></p>
          </div>
        </div>
        <div className="flex">
            <div className="text-xs mt-2 mr-4">
              <p>Logged in as: <span className="font-bold">{props.userName}</span></p>
              <p>Dashboard: <span className="font-bold">{props.dashboardName}</span></p>
            </div>  
          <p className="mr-4 pt-3"><Link href="/settings">Settings</Link></p>
          <p className="mr-4 pt-3"><button onClick={() => router.push("/logout")}>Logout</button></p>
        </div>
      </>
      )}
    </div>
  );
};

export default Navbar;