import { NextPage } from 'next';

interface Props {
}

const Login: NextPage<Props> = function Login(props) {
  return (
    <div>
      <p>login widget</p>
      <button><a href="./dashboard">login</a></button>
    </div>
  );
};

export default Login;