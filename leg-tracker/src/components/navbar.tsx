import { NextPage } from 'next';

interface Props {
}

const Navbar: NextPage<Props> = function Navbar(props) {
  return (
    <div>
      <p>
        <span><a href=".">[LOGO]</a> | </span>
        <span><a href="./search">search bills</a> | </span>
        <span><a href="./dashboard">dashboard</a> | </span>
        <span><a href="./calendar">calendar</a> | </span>
        <span>[DASHBOARD PICKER] | </span>
        <span><a href="./settings">settings</a> | </span>
        <span><a href="./login">logout</a> </span>
      </p>
    </div>
  );
};

export default Navbar;