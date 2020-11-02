import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';
import { Faq } from '../types/faq';

type FaqProps = {
  faq: Faq[];
};

export default function Home({ faq }: FaqProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Hello</h1>
        {faq.map((item) => (
          <div key={item.id}>
            {' '}
            {item.question} {item.answer}
          </div>
        ))}
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();

  const response = await prisma.faq.findMany();

  const faq = response.map((item) => ({
    ...item,
    createdate: JSON.stringify(item.createdate),
  }));

  return {
    props: {
      faq,
    },
  };
};
