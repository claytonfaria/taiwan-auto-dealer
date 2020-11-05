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
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import router, { useRouter } from 'next/router';
import useSWR from 'swr';

import { Make } from '../lib/getMakes';
import { Model } from '../lib/getModels';
import { getReqAsString } from '../utils/getReqAsString';

export default function Search() {
  const { data: makes } = useSWR<Make[]>(`/api/makes`, {
    dedupingInterval: 600_000,
  });

  const { query } = useRouter();

  const prices = [500, 1000, 5000, 15_000, 25_000, 50_000, 250_000];

  const initialValues = {
    make: query.make || 'all',
    maxPrice: query.maxPrice || 'all',
    minPrice: query.minPrice || 'all',
    model: query.model || 'all',
  };

  const handleSubmit = (values: typeof initialValues) => {
    router.push({
      pathname: '/',
      query: { ...values, page: 1 },
    });
  };

  return (
    <Box width="100%">
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form>
            <Box boxShadow="lg" padding="1rem" marginTop="1rem">
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <FormControl>
                  <FormLabel colorScheme="teal">Make</FormLabel>
                  <Field name="make" as={Select}>
                    <option value="all">All Makes</option>
                    {makes?.map((make) => (
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
                colorScheme="blue"
                type="submit"
              >
                Search
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export interface ModelSelectProps extends SelectProps {
  name: string;
  make?: string;
}

export function ModelSelect({ make, ...props }: ModelSelectProps) {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({
    name: props.name,
  });

  const { data: models } = useSWR<Model[]>(`/api/models?make=${make}`, {
    dedupingInterval: 600_000,
    onSuccess: (newValues) => {
      if (!newValues.map((a) => a.model).includes(field.value)) {
        // we want to make this field.value = 'all'
        setFieldValue('model', 'all');
      }
    },
  });

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
