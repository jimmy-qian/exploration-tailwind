import * as i from 'types';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';

import { fetchUser, useGetUser } from 'queries/example';
import { serverQueryFetch } from 'services';
import PrimeLayout from 'layouts/PrimeLayout';

/**
 * SSR (server-side rendering) dynamically renders the page on every request
 * https://www.patterns.dev/posts/server-side-rendering/
 */
const Page: i.NextPageComponent<Props, Queries> = ({ params }) => {
  const { data: user } = useGetUser(params.userId);

  return (
    <>
      <p>This page is to show how to use SSR.</p>
      data: <pre>{JSON.stringify(user, null, 2)}</pre>
      params: <pre>{JSON.stringify(params)}</pre>
    </>
  );
};

Page.layout = (page) => {
  return <PrimeLayout>{page}</PrimeLayout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext<Queries>) => {
  const userId = ctx.params?.userId;

  const { state } = await serverQueryFetch([
    {
      key: ['user', userId],
      fetchFn: () => fetchUser(ctx.params!.userId),
    },
  ]);

  return {
    props: {
      params: ctx.params!,
      // Return dehydrateState to hydrate the data in _app.tsx
      dehydrateState: state,
    },
  };
};

type Queries = {
  userId: string;
};

// We can infer the returned props as a type from the server function
type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default Page;
