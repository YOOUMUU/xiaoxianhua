import LoginForm from '@components/LoginForm';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Login = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  return <LoginForm />;
};

export default Login;
