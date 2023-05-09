import { QueryClient, QueryKey, dehydrate } from '@tanstack/react-query';

// Create a new QueryClient instance for each page request, to ensure data not being shared
// between users and requests. See: https://react-query.tanstack.com/guides/ssr
type ServerQueriesProps = {
  key: QueryKey;
  fetchFn: () => Promise<any>;
}[];

export const serverQueryFetch = async (queries: ServerQueriesProps) => {
  const queryClient = new QueryClient();

  if (queries && queries.length > 1) {
    await Promise.all(
      queries.map((query) => {
        return queryClient.prefetchQuery(query.key, query.fetchFn);
      }),
    );
  } else if (queries.length === 1) {
    await queryClient.prefetchQuery(queries[0].key, queries[0].fetchFn);
  } else {
    throw Error('Missing fetch function');
  }

  return {
    state: dehydrate(queryClient),
  };
};
