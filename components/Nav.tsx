import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  return (
    <nav className="flex justify-between w-full py-4">
      <div className="container">Nav</div>
    </nav>
  );
};

export default Nav;
