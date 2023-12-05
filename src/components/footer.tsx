import { NextPage } from 'next';

interface Props {
}

const Footer: NextPage<Props> = function Footer(props) {
  return (
    <>
      <div className="w-full bg-gray-300">
        <p>footer content</p>
      </div>
    </>
  );
};

export default Footer;