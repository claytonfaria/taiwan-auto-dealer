/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */
import { Grid, GridItem } from '@chakra-ui/core';
import Head from 'next/head';
import { ReactNode } from 'react';

import NavBar from '../components/NavBar';
import Search from '../components/Search';
import Footer from '../components/footer';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const siteTitle = 'Taiwan Auto';

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{siteTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Taiwan Auto Car Dealer - ficticious"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=dark&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-white-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Grid
        gridTemplateColumns={{ base: '1fr', lg: '1fr 1.5fr 1.5fr' }}
        gridTemplateRows={{
          base: '0.15fr 1fr 1fr 0.1fr',
          lg: '0.15fr 3fr 0.1fr',
        }}
        height="100vh"
        gridTemplateAreas={{
          base: "'nav'\
      'sidebar'\
      'content'\
      'footer'",
          lg:
            "'nav nav nav'\
      'sidebar content content'\
      'footer footer footer'",
        }}
        maxWidth="1200px"
        marginX="auto"
        gridGap="0.5rem"
      >
        <GridItem gridArea="nav">
          <NavBar />
        </GridItem>
        <GridItem gridArea="sidebar">
          <Search />
        </GridItem>
        <GridItem gridArea="content">{children}</GridItem>
        <GridItem gridArea="footer">
          <Footer />
        </GridItem>
      </Grid>
    </>
  );
}
