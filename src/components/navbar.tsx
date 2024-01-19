import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
}

const Navbar: NextPage<Props> = function Navbar(props) {
  return (
    <div className="w-full bg-gray-300">
      <p>
        <span><Link href=".">[LOGO]</Link> | </span>
        <span><Link href="/search">search bills</Link> | </span>
        <span><Link href="/dashboard">dashboard</Link> | </span>
        <span><Link href="/calendar">calendar</Link> | </span>
        <span>[DASHBOARD PICKER] | </span>
        <span><Link href="/settings">settings</Link> | </span>
        <span><Link href="/logout">logout</Link> </span>
      </p>
    </div>
  );
};

export default Navbar;