import * as i from 'types';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { useGetUser } from 'queries/example';
import PrimeLayout from 'layouts/PrimeLayout';

/**
 * SSG (static site generation) is like Gatsby: it will generate a static page during build-time
 * and serve the static file on every request.
 * You can tell Next to revalidate this page's data every x seconds in getStaticProps and build an
 * up-to-date page
 * https://www.patterns.dev/posts/static-rendering/
 */
const Page: i.NextPageComponent<Props> = ({ userId }) => {
  const { data: user } = useGetUser(userId);

  return (
    <>
      <p>This page is to show how to use SSG.</p>
      data: <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
};

Page.layout = (page) => {
  return <PrimeLayout>{page}</PrimeLayout>;
};

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
  return {
    props: {
      userId: '3783ce59-0e59-4a77-aaaf-e824f7c5e8f1',
    },
    revalidate: 300, // 5 minutes
  };
};

// We can infer the returned props as a type from the server function
type Props = InferGetStaticPropsType<typeof getStaticProps>;

export default Page;
