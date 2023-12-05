import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/layouts/default'
import BillLayout from '@/layouts/bill'

import { IBillRepository } from "@/definitions/bill.repository"
import { repositories } from "@/repositories/index"

export default function BillDetails({ bill_id }: any) {
  return (
    <Layout>
      <BillLayout>
        <p>bill details</p>
      </BillLayout>
    </Layout>
  );
};

export async function getServerSideProps(context: any) {
  return {
    props: {
      bill_id: context.query.bill_id
    },
  };
}