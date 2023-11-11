import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/layouts/simple'
import { Button } from '@/components/ui/button'

export default function Search() {
  return (
    <Layout>
      <div>
        <p>settings</p>
        <Button><a href="./dashboard">save</a></Button>
      </div>
    </Layout>
  );
};