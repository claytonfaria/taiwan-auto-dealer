/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/no-default-export */

import { Link } from '@chakra-ui/core';
import Pagination, {
  PaginationRenderItemParams,
} from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { forwardRef } from 'react';

export default function CarPagination({ totalPages }: { totalPages?: number }) {
  const { query } = useRouter();

  return (
    <Pagination
      style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      color="primary"
      page={Number(query.page || '1')}
      count={totalPages || 1}
      renderItem={(item) => (
        <PaginationItem
          component={PaginationLink}
          query={query}
          item={item}
          {...item}
        />
      )}
    />
  );
}

export type PaginationLinkProps = {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
};

const PaginationLink = forwardRef<HTMLAnchorElement, PaginationLinkProps>(
  ({ item, query, ...props }, ref) => (
    <NextLink
      scroll={false}
      href={{
        pathname: '/',
        query: { ...query, page: item.page },
      }}
      shallow
    >
      <Link ref={ref} {...props} />
    </NextLink>
  )
);
