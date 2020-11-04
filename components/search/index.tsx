/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */

import {
  Button,
  FormControl,
  FormLabel,
  SelectProps,
  SimpleGrid,
  Box,
  Select,
} from '@chakra-ui/core';
import axios from 'axios';
import { Field, Form, Formik, useField } from 'formik';
import router, { useRouter } from 'next/router';
import useSWR from 'swr';

import { getMakes, Make } from '../../lib/getMakes';
import { Model } from '../../lib/getModels';
import { getReqAsString } from '../../utils/getReqAsString';

type SearchProps = {
  makes: Make[];
  singleColumn?: boolean;
};

export default function Search({ makes, singleColumn }: SearchProps) {
  const { query } = useRouter();

  const prices = [500, 1000, 5000, 15_000, 25_000, 50_000, 250_000];

  const initialValues = {
    make: query.make || 'all',
    maxPrice: query.maxPrice || 'all',
    minPrice: query.minPrice || 'all',
    model: query.model || 'all',
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={(values) => {
        router.push(
          {
            pathname: '/car',
            query: { ...values, page: 1 },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      {({ values }) => (
        <Form>
          <Box boxShadow="lg" padding="2rem">
            <SimpleGrid columns={singleColumn ? 1 : 2} spacing={4}>
              <FormControl id="make">
                <FormLabel>Make</FormLabel>
                <Field name="make" as={Select}>
                  <option value="all">All Makes</option>
                  {makes.map((make) => (
                    <option
                      key={make.make}
                      value={make.make}
                    >{`${make.make} (${make.count})`}</option>
                  ))}
                </Field>
              </FormControl>
              <ModelSelect name="model" make={getReqAsString(values.make)} />
              <FormControl id="minPrice">
                <FormLabel>Min Price</FormLabel>
                <Field name="minPrice" as={Select}>
                  <option value="all">No Min</option>
                  {prices.map((price) => (
                    <option key={price} value={price}>
                      {price}
                    </option>
                  ))}
                </Field>
              </FormControl>
              <FormControl id="maxPrice">
                <FormLabel>Max Price</FormLabel>
                <Field name="maxPrice" as={Select}>
                  <option value="all">No Max</option>
                  {prices.map((price, index) => (
                    <option key={index} value={price}>
                      {price}
                    </option>
                  ))}
                </Field>
              </FormControl>
            </SimpleGrid>
            <Button
              width="100%"
              marginTop="1rem"
              colorScheme="teal"
              type="submit"
            >
              Search
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export interface ModelSelectProps extends SelectProps {
  name: string;
  make: string;
}

export function ModelSelect({ make, ...props }: ModelSelectProps) {
  const [field] = useField({
    name: props.name,
  });

  const fetcher = (url: string) => axios(url).then((r) => r.data);

  const { data: models } = useSWR<Model[]>(
    `/api/models?make=${make}`,
    fetcher,
    {
      dedupingInterval: 100_000,
    }
  );

  return (
    <FormControl>
      <FormLabel>Model</FormLabel>
      <Select {...props} {...field}>
        <option value="all">All Models</option>
        {models?.map((model) => (
          <option
            key={model.model}
            value={model.model}
          >{`${model.model} (${model.count})`}</option>
        ))}
      </Select>
    </FormControl>
  );
}
