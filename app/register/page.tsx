import RegisterForm from '@components/RegisterForm';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const Register = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/');

  return <RegisterForm />;
};

export default Register;
