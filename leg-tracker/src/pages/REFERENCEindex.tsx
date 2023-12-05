import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import Layout from '@/layouts/simple'

export default function Home() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      // 👇️ redirects to an external URL
      window.location.replace('./dashboard');
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Layout>
      <div>
        <p>checking if logged in, will redirect in 3 seconds</p>
      </div>
    </Layout>
  );
};