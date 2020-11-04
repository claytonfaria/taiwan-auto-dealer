import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/core';
import { FaqModel } from '../types/faq';

type FaqCardProps = {
  faq: FaqModel;
};

export default function FaqCard({ faq: { question, answer } }: FaqCardProps) {
  return (
    <AccordionItem>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          {question}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>{answer}</AccordionPanel>
    </AccordionItem>
  );
}
