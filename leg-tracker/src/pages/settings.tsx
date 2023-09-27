import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/layouts/simple'

export default function Search() {
  return (
    <Layout>
      <div>
        <p>settings</p>
        <button><a href="./dashboard">save</a></button>
      </div>
    </Layout>
  );
};