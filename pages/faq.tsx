/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/function-component-definition */
import { Accordion } from '@chakra-ui/core';
import { PrismaClient } from '@prisma/client';
import { GetStaticProps } from 'next';

import FaqCard from '../components/faqCard';
import { FaqModel } from '../types/faq';

type FaqProps = {
  faq: FaqModel[];
};

const Faq = ({ faq }: FaqProps) => {
  return (
    <Accordion allowToggle>
      {faq.map((item) => (
        <FaqCard faq={item} key={item.id} />
      ))}
    </Accordion>
  );
};
export default Faq;

export const getStaticProps: GetStaticProps = async () => {
  const prisma = new PrismaClient();

  const response = await prisma.faq.findMany();

  const faq: FaqModel[] = response.map((item) => ({
    ...item,
    createdate: JSON.stringify(item.createdate),
  }));

  return {
    props: {
      faq,
    },
  };
};
