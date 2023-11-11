import { NextPage } from 'next';
import { Button } from '@/components/ui/button'

interface Props {
}

const Login: NextPage<Props> = function Login(props) {
  return (
    <div>
      <p>login widget</p>
      <Button><a href="./dashboard">login</a></Button>
    </div>
  );
};

export default Login;