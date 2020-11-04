/* eslint-disable import/no-default-export */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ChakraProvider } from '@chakra-ui/core';
import axios from 'axios';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import Layout from '../layouts/default';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <SWRConfig
        value={{
          fetcher: (url: string) => axios(url).then((r) => r.data),
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
